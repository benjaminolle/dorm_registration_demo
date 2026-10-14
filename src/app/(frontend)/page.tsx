export default function Home() {
  return (
    <section className="grow justify-center pb-[10rem]">
      <div className="bo-container items-center gap-y-[3rem] text-center max-sm:gap-y-[10rem]">
        <h1 className="font-[300]">Welcome to the <br /><strong>Dorm Registration Portal</strong></h1>
        <div className="md:flex-row w-full md:max-w-[600] max-md:items-center gap-y-[0.5rem] justify-center gap-x-[1rem]">
          <a className="secondary-btn btn max-w-[250px] w-full" href="/login">Log in</a>
          <a className="primary-btn btn max-w-[250px] w-full" href="/register">Register</a>
        </div>
      </div>
    </section>

  );
}
