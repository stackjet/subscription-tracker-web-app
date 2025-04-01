import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {
    let json_data = await request.json();
    console.log("JSON Data: ", json_data);

    let tenant = await auth().tenantManager().createTenant({
        displayName: json_data.company_name,
        emailSignInConfig: {
            enabled: true,
            passwordRequired: true
        }
    });
    
    let tenantWithToken = {
        ...tenant,
        custom_token: await auth().createCustomToken(tenant.tenantId)
    }

    return NextResponse.json(tenantWithToken)
};