const DeleteSpecie = ({deleteVehicles}: any) => {
    return(
        <div className="container mt-3">
            <button className="btn btn-secondary" onClick={()=> deleteVehicles()}>
                Delete manually added vehicles
            </button>
        </div>
    );
}

export default DeleteSpecie;