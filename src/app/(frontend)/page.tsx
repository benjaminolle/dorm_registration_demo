import Link from "next/link";

export default function Home() {
  return (
    <section className="grow justify-center pb-[10rem]">
      <div className="bo-container items-center gap-y-[3rem] text-center">
        <h1 className="font-[300]">Welcome to the <br /><strong>Dorm Registration Portal</strong></h1>
        <div className="md:flex-row w-full md:max-w-[600] max-md:items-center gap-y-[0.5rem] justify-center gap-x-[1rem]">
          <Link className="secondary-btn btn min-w-[200px]" href="/login">Log in</Link>
          <Link className="primary-btn btn min-w-[200px]" href="/register">Register</Link>
        </div>
      </div>
    </section>

  );
}
