import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      format: "hex",
      openSnackbar: false
    };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(e) {
    this.setState({ format: e.target.value, openSnackbar: true });
    this.props.handleChange(e.target.value);
  }

  closeSnackbar() {
    this.setState({ openSnackbar: false })
  }

  render() { 
    const { level, changeLevel, showingAllColors } = this.props;
    const { format } = this.state;
    return ( 
      <header className="Navbar">
        <div className="logo">
        <Link to="/">reactcolorpicker</Link>
        </div>
        {showingAllColors && (
          <div className="slider-container">
            <span>Level: {level}</span>
            <div className="slider">
              <Slider 
                defaultValue={level}
                min={100} 
                max={900} 
                step={100} 
                onAfterChange={changeLevel} 
              />
            </div>
          </div>
        )}
        <div className="select-container">
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgb(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.openSnackbar}
          autoHideDuration={3000}
          onClose={this.closeSnackbar}
          message={<span id='message-id'>Format changed to {format} !</span>}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          action={[
            <IconButton 
              onClick={this.closeSnackbar} 
              color="inherit" 
              key="close" 
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}
 
export default Navbar;