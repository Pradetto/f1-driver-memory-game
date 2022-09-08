import React from "react";

const BootstrapModal = () => {
  return (
    <div
      class="modal"
      //   id={`id${item.todo_id}`}
      //   onClick={() => setDescription(item.description)}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Todo</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              //   onClick={() => setDescription(item.description)}
            >
              &times;
            </button>
          </div>

          <div class="modal-body">
            <input
              type="text"
              className="form-control"
              //   value={description}
              //   onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-warning"
              data-dismiss="modal"
              //   onClick={(e) => updateDescription(e)}
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              //   onClick={() => setDescription(item.description)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapModal;
