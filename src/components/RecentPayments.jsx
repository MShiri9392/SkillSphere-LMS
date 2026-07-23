function RecentPayments() {

    const payments = [
        {
            id: 1,
            student: "Shiri",
            amount: 4999
        },
        {
            id: 2,
            student: "Rahul",
            amount: 2999
        },
        {
            id: 3,
            student: "Anjali",
            amount: 3999
        },
        {
            id: 4,
            student: "Kiran",
            amount: 5999
        }
    ];

    return (

        <div className="card shadow-lg border-0">

            <div className="card-header bg-dark text-white">
                <h5 className="mb-0">💳 Recent Payments</h5>
            </div>

            <div className="card-body">

                <table className="table table-striped">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Student</th>
                            <th>Amount</th>
                        </tr>

                    </thead>

                    <tbody>

                        {payments.map((payment) => (

                            <tr key={payment.id}>

                                <td>{payment.id}</td>

                                <td>{payment.student}</td>

                                <td>₹{payment.amount}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default RecentPayments;