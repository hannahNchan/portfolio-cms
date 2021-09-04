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
    margin: theme.spacing(0.5),
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

export default function ChipsArray() {
  const classes = useStyles();
  const [chipData, setChipData] = useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);
  const [text, setText] = useState('');

  useEffect(() => {
    //const clonedArray = [...chipData];
    //clonedArray.push(dataArray);
    //setChipData([...clonedArray]);
  },[]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const addItem = () => {
    const clonedArray = [...chipData];
    clonedArray.push({ key: chipData.length + 1, label: text});
    setChipData([...clonedArray]);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Paper component="div" className={classes.root}>
      <div className="hannah-addItem">
        <TextField
          value={text}
          helperText=""
          margin="normal"
          name="activities"
          InputLabelProps={{
            shrink: true,
          }}
          label="Add technology"
          onChange={handleChange}
          id="standard-full-width"
          className={classes.field}
        />
        <Button
          color="primary"
          onClick={addItem}
          variant="outlined"
          startIcon={<AddIcon/>}
          disabled={text === ''}
          className={classes.addButton}
        >
          Add Item
        </Button>
      </div>
      <div className={classes.chips}>
        {chipData.map((data) => {
          let icon;

          if (data.label === 'React') {
            icon = <TagFacesIcon />;
          }

          return (
            <li key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </div>
    </Paper>
  );
}