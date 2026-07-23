import { useEffect, useState } from "react";
import {
    getAllNotifications,
    markAsRead,
    deleteNotification,
} from "../services/NotificationService";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = () => {
        getAllNotifications()
            .then((res) => setNotifications(res.data))
            .catch(console.error);
    };

    const handleRead = (id) => {
        markAsRead(id).then(loadNotifications);
    };

    const handleDelete = (id) => {
        deleteNotification(id).then(loadNotifications);
    };

    return (
        <div className="container mt-4">
            <h2>Notifications</h2>

            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {notifications.map((notification) => (
                        <tr key={notification.id}>
                            <td>{notification.title}</td>
                            <td>{notification.message}</td>
                            <td>
                                {notification.read ? "Read" : "Unread"}
                            </td>
                            <td>{notification.createdAt}</td>
                            <td>
                                {!notification.read && (
                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => handleRead(notification.id)}
                                    >
                                        Mark Read
                                    </button>
                                )}

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(notification.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Notifications;