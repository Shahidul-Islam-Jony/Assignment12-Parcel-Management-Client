
const Features = () => {
    return (
        <div>
            <h2 className="text-4xl text-center my-10 text-blue-800 font-medium">--- Our Features ---</h2>
            <div>
                {/* Parcel Safety */}
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Parcel Safety</h2>
                        <p>Description .....</p>
                    </div>
                </div>
                {/* Super Fast */}
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Super Fast</h2>
                        <p>Description .....</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;