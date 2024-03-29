import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BufferedFormControl, { BufferedProps } from "./BufferedFormControl";

export default class EditableFormControl extends React.Component<BufferedProps, { editing: boolean }> {
  readonly state = {
    editing: false
  }

  render() {
    if (this.state.editing) {
      return <BufferedFormControl
        {...this.props} 
        onUpdate={ v => {
          this.setState({ editing: false });
          this.props.onUpdate?.(v);
        }}
      />;
    } else {
      return <React.Fragment>
        &nbsp;
        {
          this.props.disabled ? <React.Fragment /> :
            <a className="text-muted" onClick={e => {
              e.stopPropagation();
              this.setState({ editing: true })}
            }>
              <FontAwesomeIcon icon={faPencilAlt} />
            </a>
        }
        &nbsp; &nbsp;
        {this.props.value}
      </React.Fragment>
    }
  }
}