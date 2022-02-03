import crypto from "crypto";
import { Database, User, Viewer } from "../../../lib/types";
import { Google } from "../../../lib/api";
import { IResolvers } from "@graphql-tools/utils";
import { LogInArgs } from "./types";


async function logInViaGoogle(
    code: string, 
    token: string,
    db: Database,

): Promise<User | null> {
    const { user } = await Google.logIn(code);

    if (!user) {
        throw new Error("Google log in error");
    }

    // Names/Photos/Email Lists
    const userNamesList = user.names && user.names.length ? user.names : null;
    const userPhotosList =
        user.photos && user.photos.length ? user.photos : null;
    const userEmailsList =
        user.emailAddresses && user.emailAddresses.length
            ? user.emailAddresses
            : null;

    // User Display Name
    const userName = userNamesList ? userNamesList[0].displayName : null;

    // User Id
    const userId =
        userNamesList &&
        userNamesList[0].metadata &&
        userNamesList[0].metadata.source
            ? userNamesList[0].metadata.source.id
            : null;

    // User Avatar
    const userAvatar =
        userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

    // User Email
    const userEmail =
        userEmailsList && userEmailsList[0].value
            ? userEmailsList[0].value
            : null;

    if (!userId || !userName || !userAvatar || !userEmail) {
        throw new Error("Google login error");
    }

    const updateRes = await db.users.findOneAndUpdate(
        { _id: userId },
        {
            $set: {
                name: userName,
                avatar: userAvatar,
                contact: userEmail,
                token: token,
            },
        },
        { returnDocument: "after" }
    );

    let viewer = updateRes.value;

    if (!viewer) {
        const inserRes = await db.users.insertOne({
            _id: userId,
            name: userName,
            avatar: userAvatar,
            contact: userEmail,
            token: token,
            bookings: [],
            income: 0,
            listings: [],
        });

        viewer= await db.users.findOne({ _id: inserRes.insertedId });
    }

    return viewer;
}

export const viewerResolvers: IResolvers = {
    Query: {
        authUrl: authUrlQuery,
    },
    Mutation: {
        logIn: logInMutation,
        logOut: logOutMutation,
    },
    Viewer: {
        id: getViewerId,
        hasWallet: viewerHasWallet,
    },
};
function viewerHasWallet(viewer: Viewer): boolean | undefined {
    return viewer.walletId ? true : undefined;
}

function getViewerId(viewer: Viewer): string | undefined {
    return viewer._id;
}

function logOutMutation(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _root: undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _args: unknown,
): Viewer {
    try {
       
        return { didRequest: true };
    } catch (error) {
        throw new Error(`Failed to log out: ${error}`);
    }
}
async function logInMutation(
    _root: undefined,
    { input }: LogInArgs,
    {db}:{db:Database}
): Promise<Viewer> {
    try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString("hex");

        const viewer: User | undefined = code
        await logInViaGoogle(code, token, db)

        if (!viewer) {
            return { didRequest: true };
        }

        return {
            _id: viewer._id,
            token: viewer.token,
            avatar: viewer.avatar,
            walletId: viewer.walletId,
            didRequest: true,
        };
    } catch (error) {
        throw new Error(`Failed to log in: ${error}`);
    }
}

function authUrlQuery(): string {
    try {
        return Google.authUrl;
    } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`);
}}