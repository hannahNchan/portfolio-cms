import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import '../../containers/App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '1rem',
    flexDirection: 'column',
  },
  chip: {
    '& svg': {
      color: '#ce8584'
    },
    margin: theme.spacing(0.5),
    color: '#689ad0',
    backgroundColor: '#bee1f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  field: {
    width: '70%',
  },
  text: {
    width: 'inherit',
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: '0.5px',
    marginTop: '1rem',
  },
  addButton: {
    alignSelf: 'flex-end',
  }
}));

const ChipsArray = ({
  index,
  disabled,
  technologies,
  textTechnology,
  handleDeleteChips,
  handleChangeChips,
  addItemChips 
}) => {
  const classes = useStyles();
  const disabledButton = disabled && typeof textTechnology[index] === 'undefined' || textTechnology[index] === '';

  return (
    <Paper component="div" className={classes.root}>
      <div className="hannah-addItem">
        <TextField
          value={textTechnology[index]}
          helperText=""
          margin="normal"
          name="activities"
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
          label="Add technology"
          onChange={(e) => handleChangeChips(index, e)}
          id="standard-full-width"
          className={classes.field}
        />
        <Button
          color="primary"
          onClick={() => addItemChips(index)}
          variant="outlined"
          startIcon={<AddIcon/>}
          disabled={disabledButton}
          className={classes.addButton}
        >
          Add Item
        </Button>
      </div>
      <div className={classes.chips}>
        {technologies.map((data, idx) => {
          let icon = <i class="devicon-react-original colored"></i>;
          return (
            <li key={idx}>
              <Chip
                disabled={disabled}
                icon={icon}
                label={data}
                onDelete={handleDeleteChips({ key: idx, label: data }, index)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </div>
    </Paper>
  );
}

export default ChipsArray;

