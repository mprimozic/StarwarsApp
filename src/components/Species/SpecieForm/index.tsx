const SpecieForm = ({handleSumbit} :any) => {
    return(
        <form className="container mt-4" onSubmit={handleSumbit}>
            <div className="mb-2 row">
                <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="name" placeholder="name"/>
                </div>
            </div>
            <div className="mb-2 row">
                <label htmlFor="model" className="col-sm-2 col-form-label">Model</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="model" placeholder="model"/>
                </div>
            </div>
            <div className="mb-2 row">
                <label htmlFor="manufacturer" className="col-sm-2 col-form-label">Manufacturer</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="manufacturer" placeholder="manufacturer"/>
                </div>
            </div>
            <div className="mb-2 row">
                <label htmlFor="cost_in_credits" className="col-sm-2 col-form-label">Cost in credits</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id="cost_in_credits" placeholder="e.g. 10000"/>
                </div>
            </div>
            <button>Submit</button>
        </form>
    );
}

export default SpecieForm;