import { HttpError } from "@/lib/http";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import authApiRequest from "@/appRequest/auth";

export async function POST(request: Request) {
  const res = (await request.json()) as LoginBodyType;
  //   const cookieStore = cookies();
  try {
    const { payload } = await authApiRequest.sLogin(res);
    const {
      data: { accessToken, refreshToken },
    } = payload;
    const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };

    const cookieStore = (cookies() as unknown) as {
      set: (options: {
        name: string;
        value: string;
        path?: string;
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: "lax" | "strict" | "none";
        expires?: Date;
      }) => void;
    };

    cookieStore.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "lax",
      expires: new Date(decodedAccessToken.exp * 1000),
    });

    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "lax",
      expires: new Date(decodedRefreshToken.exp * 1000),
    });

    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        }
      );
    }
  }
}
