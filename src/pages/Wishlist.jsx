import { useEffect, useState } from "react";
import {
    getAllWishlist,
    addToWishlist,
    deleteWishlist
} from "../services/WishlistService";

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);
    const [userId, setUserId] = useState("");
    const [courseId, setCourseId] = useState("");

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = async () => {
        try {
            const response = await getAllWishlist();
            console.log(response.data);
            setWishlist(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load Wishlist");
        }
    };

    const handleAdd = async () => {

        if (!userId || !courseId) {
            alert("Please enter User ID and Course ID");
            return;
        }

        try {

            await addToWishlist(userId, courseId);

            alert("Course added to Wishlist");

            setUserId("");
            setCourseId("");

            loadWishlist();

        } catch (error) {
            console.error(error);
            alert("Unable to add Wishlist");
        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this wishlist item?"))
            return;

        try {

            await deleteWishlist(id);

            alert("Wishlist Item Deleted");

            loadWishlist();

        } catch (error) {
            console.error(error);
            alert("Unable to delete Wishlist");
        }
    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">
                ❤️ Wishlist
            </h2>

            <div className="card shadow p-4 mb-4">

                <div className="row g-2">

                    <div className="col-md-5">

                        <input
                            type="number"
                            className="form-control"
                            placeholder="User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />

                    </div>

                    <div className="col-md-5">

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Course ID"
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                        />

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn btn-success w-100"
                            onClick={handleAdd}
                        >
                            Add
                        </button>

                    </div>

                </div>

            </div>

            {wishlist.length === 0 ? (

                <div className="alert alert-warning text-center">
                    No Wishlist Items Available
                </div>

            ) : (

                <div className="row">

                    {wishlist.map((item) => (

                        <div className="col-md-4 mb-4" key={item.id}>

                            <div className="card shadow h-100">

                                <div className="card-body">

                                    <h5>
                                        Wishlist #{item.id}
                                    </h5>

                                    <hr />

                                    <p>
                                        <strong>User ID:</strong>{" "}
                                        {item.user?.id}
                                    </p>

                                    <p>
                                        <strong>Course ID:</strong>{" "}
                                        {item.course?.id}
                                    </p>

                                    <p>
                                        <strong>Course:</strong>{" "}
                                        {item.course?.title}
                                    </p>

                                </div>

                                <div className="card-footer bg-white border-0">

                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Wishlist;