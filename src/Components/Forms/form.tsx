import React from 'react';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Field from './fields'
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { yupResolver } from '@hookform/resolvers/yup';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  form: {
    marginTop: '1.5rem',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

interface IFormInput {
  name?: string;
}

const Form = (props) => {
  const classes = useStyles();

  const optionalValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
  });

  const { control, handleSubmit, reset
  } = useForm<IFormInput>({
    resolver: yupResolver(optionalValidationSchema),
  })

  const onSubmit = handleSubmit((data) => {
    props.handleSubmit(data);
    reset({name: ""})
  })

  return (
    <form onSubmit={onSubmit} data-testid='form'>
      <Grid container spacing={3}>
        {props.formData.map((field, index) => (
          <Grid item xs={6} sm={6} key={index}>
            <Field
              name={field.name}
              label={field.label}
              type={field.type}
              control={control}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.buttons}>
        <Button className={classes.button} type="submit">Submit{props.status.loading ? '...' : null}</Button>
      </div>
    </form>
  )
}

export default Form