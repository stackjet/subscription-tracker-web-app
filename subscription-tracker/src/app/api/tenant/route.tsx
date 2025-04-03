import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {
    let json_data = await request.json();
    console.log("JSON Data: ", json_data);
    let tenantDisplayName = json_data.company_name.replace(/\s+/g, "-").toLowerCase();
    console.log("Tenant Display Name: ", tenantDisplayName);

    let tenant = await auth().tenantManager().createTenant({
        displayName: tenantDisplayName,
        emailSignInConfig: {
            enabled: true,
            passwordRequired: true
        }
    });
    
    // let tenantWithToken = {
    //     ...tenant,
    //     custom_token: await auth().createCustomToken(tenant.tenantId),
    //     company_name: json_data.company_name
    // }
    let tenantData = {
        tenant_name: json_data.company_name,
        tenant_identity_platform_name: tenant.displayName,
        tenant_identity_platform_id: tenant.tenantId,
    }

    const resp = await fetch(
        process.env.NEXT_PUBLIC_WEB_API_URI + "/users/register/tenant",
        {
            method: "POST",
            body: JSON.stringify(tenantData),
            headers: {
                "Content-Type": "application/json"
            },
        }
    )

    console.log("Response: ", resp);

    return NextResponse.json(tenantData)
};