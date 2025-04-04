import { auth as adminAuth } from "firebase-admin";
import { 
    UserCredential, 
    browserLocalPersistence,
    createUserWithEmailAndPassword, 
    setPersistence, 
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth as clientAuth } from "@/app/firebase/config";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {
    let json_data = await request.json();
    console.log("JSON Data: ", json_data);
    let tenantDisplayName = json_data.company_name.replace(/\s+/g, "-").toLowerCase();
    console.log("Tenant Display Name: ", tenantDisplayName);

    let tenant = await adminAuth().tenantManager().createTenant({
        displayName: tenantDisplayName,
        emailSignInConfig: {
            enabled: true,
            passwordRequired: true
        }
    });
    
    let tenantData = {
        tenant_name: json_data.company_name,
        tenant_identity_platform_name: tenant.displayName,
        tenant_identity_platform_id: tenant.tenantId,
    }

    const resp = await fetch(
        process.env.NEXT_PUBLIC_WEB_API_URI + "/tenant/register",
        {
            method: "POST",
            body: JSON.stringify(tenantData),
            headers: {
                "Content-Type": "application/json"
            },
        }
    )

    let tenantResponseData = await resp.json();
    console.log("Response: ", tenantResponseData);

    const user: UserCredential = await createUserWithEmailAndPassword(clientAuth, json_data.admin.email, json_data.admin.password);
    const token = await user.user.getIdToken();
    const payload = {
        tenant_id: tenantResponseData.tenant_id,
        email: user.user.email,
        firebase_api_id: user.user.uid,
        username: json_data.admin.username,
    };

    const userResponse = await fetch(
        process.env.NEXT_PUBLIC_WEB_API_URI + "/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );
    let userResponseData = await userResponse.json();
    console.log("User Response: ", userResponseData);

    return NextResponse.json(tenantData)
};