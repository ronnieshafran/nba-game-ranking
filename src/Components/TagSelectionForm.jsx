import React from "react";
import Form from "react-bootstrap/Form";
//will recieve badge list
function TagSelectionForm(props) {
  const previouslySelected = localStorage.getItem("preferredBadges")
    ? localStorage.getItem("preferredBadges")
    : props.badgeList;
  return (
    <Form>
      {props.badgeList.map((badge, index) => (
        <div className="mb-3" key={index}>
          <Form.Check
            type="checkbox"
            id={`default-${index}`}
            label={badge}
            onChange={props.onChange}
            defaultChecked={previouslySelected.includes(badge)}
            custom
          />
        </div>
      ))}
    </Form>
  );
}
export default TagSelectionForm;
