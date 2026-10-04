export default function PortalFooter() {

    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <section className=" bg-(--color-primary) py-3">
                <div className="bo-container flex-row justify-between text-(length:--fs-xs) gap-y-[3rem] text-(--color-offwhite)">
                    <span>&copy;{currentYear}</span>
                    <span>Dorm Registration Portal</span>
                </div>
            </section>
        </footer>
    );
}