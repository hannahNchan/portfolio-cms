import React from 'react'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import UIDatePicker from '../DatePicker/UIDatePicker';

const CardForm = ({ 
  date,
  title,
  index,
  classes,
  subtitle,
  textItem,
  activities,
  description,
  disabledForm,
  handleAddItem,
  onHandleDeleteItem,
  onHandleChangeText,
  onHandleDateChange
}) => {

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <TextField
            name="title"
            value={title}
            helperText=""
            margin="normal"
            label="Company name"
            disabled={!disabledForm}
            id="standard-full-width"
            style={{ width: '85%' }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onHandleChangeText(e, index)}
          />
        </Grid >
        <Grid item xs={12} md={6}>
          <UIDatePicker
            selectDate={date}
            disabled={!disabledForm}
            handleDateChange={(e) => onHandleDateChange(e, index)}
          />
        </Grid >
      </Grid >
      <Grid container>
        <Grid item xs={12} md={6}>
          <TextField
            id="standard-full-width"
            label="Position"
            name="subtitle"
            value={subtitle}
            style={{ alignSelf: 'flex-end', width: '85%' }}
            helperText=""
            fullWidth
            disabled={!disabledForm}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onHandleChangeText(e, index)}
          />
        </Grid >
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            name="description"
            multiline
            value={description}
            fullWidth
            rows={4}
            disabled={!disabledForm}
            variant="outlined"
            onChange={(e) => onHandleChangeText(e, index)}
          />
        </Grid >
      </Grid >
      <div id="counter-list">
        <Typography variant="subtitle1">
          Add your main activities in this position
        </Typography>
        <div className="hannah-addItem">
          <TextField
            id="standard-full-width"
            label="Position"
            disabled={!disabledForm}
            style={{ width: '70%' }}
            helperText=""
            margin="normal"
            name="activities"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onHandleChangeText(e, index)}
            value={textItem[index]}
          />
          <Button
            onClick={() => handleAddItem('activities',index)}
            variant="outlined"
            disabled={!disabledForm}
            color="primary"
            className={classes.button}
            startIcon={<AddIcon/>}
          >
            Add Item
          </Button>
        </div>
        <div className="hannah-list">
          <List>
            {activities.map((item, idx) => (
              <ListItem>
                <ListItemText
                  primary={<p>{item}</p>}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    name="activities"
                    onClick={() => onHandleDeleteItem('activities', idx, index)}
                    edge="end"
                    aria-label="delete"
                    disabled={!disabledForm}
                  >
                    <DeleteIcon
                      style={{ color: disabledForm ? "#de4040": "#949494" }}
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>          
        </div>
      </div>
    </>
  )
}

CardForm.propTypes = {
  date: PropTypes.number,
  title: PropTypes.string,
  index: PropTypes.number,
  classes: PropTypes.object,
  textItem: PropTypes.array,
  subtitle: PropTypes.string,
  activities: PropTypes.array,
  description: PropTypes.string,
  handleAddItem: PropTypes.func,
  disabledForm: PropTypes.bool,
  onHandleDeleteItem: PropTypes.func,
  onHandleChangeText: PropTypes.func,
  onHandleChangeDate: PropTypes.func
};

export default CardForm;
