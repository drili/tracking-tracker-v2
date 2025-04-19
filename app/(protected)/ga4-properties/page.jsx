import PropertyTable from "@/app/components/Analytics/PropertyTable"

export default function GA4PropertiesPage() {
    return (
        <section id="pageGA4PropertiesPage">
            <h1 className="text-3xl font-bold mb-4">Properties Page</h1>
            <p>Welcome to your properties overview page.</p>

            <div>
                <PropertyTable />
            </div>
        </section>
    )
}