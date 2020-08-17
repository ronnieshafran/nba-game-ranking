import React, { Component, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TagSelectionForm from "./TagSelectionForm";

function Preferences(props) {
  let preferredBadges = props.preferredBadges;
  const [show, setShow] = useState(false);
  const handleSave = () => {
    setShow(false);
    props.onSave(preferredBadges);
  };
  const handleShow = () => setShow(true);
  const handleChange = (event) => {
    const badge = event.target.labels[0].innerText;
    const isChecked = event.target.checked === true;
    if (isChecked) {
      console.log("Pushing badge: " + badge);
      console.log("Before:");
      console.log(preferredBadges);
      preferredBadges.push(badge);
      console.log("After:");
      console.log(preferredBadges);
    } else {
      const index = preferredBadges.indexOf(badge);
      console.log("removing badge: " + badge);
      console.log("Before:");
      console.log(preferredBadges);
      preferredBadges.splice(index, 1);
      console.log("After:");
      console.log(preferredBadges);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Preferences
      </Button>
      <Modal
        show={show}
        onHide={handleSave}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <Modal.Title>Preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: "20px" }}>
            Which Tags Would You Like To See?
          </div>
          <div>
            <TagSelectionForm
              badgeList={props.badgeList}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Preferences;
