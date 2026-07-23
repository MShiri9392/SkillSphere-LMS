import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <main
                    className="flex-grow-1 p-4"
                    style={{
                        minHeight: "100vh",
                        backgroundColor: "#f8f9fa",
                        overflowY: "auto"
                    }}
                >
                    {children}
                </main>

            </div>
        </>
    );
}

export default Layout;