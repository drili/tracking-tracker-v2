"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export default function Nav() {
    const { data: session } = useSession()

    return (
        <section id="componentNav">
            <nav className="navbar bg-base-200 p-4 flex justify-between items-center ">
                <a href="/" className="text-xl font-bold">Tracking Tracker</a>
                <div className="flex gap-2">
                    {session ? (
                        <>
                            <a href="/dashboard" className="btn btn-ghost">Dashboard</a>
                            <button className="btn btn-primary" onClick={() => signOut()}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-primary" onClick={() => signIn("google")}>
                            Sign In
                        </button>
                    )}
                </div>
            </nav>
        </section>
    )
}