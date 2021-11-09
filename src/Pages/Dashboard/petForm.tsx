import React from 'react';
import Form from '../../Components/Forms/form'
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

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
        padding: theme.spacing(10),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}));

export type FormData = {
    name: string;
    type:string;
    label:string;
    default:string;
}

const formData: FormData[] = [{
    name: "name",
    type: "text",
    label: "name",
    default: ""
}]

const PetForm = (props) => {
    const classes = useStyles();

    return (
            <Paper className={classes.paper}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Add Pet
                </Typography>
                <Form
                  formData={formData}
                  handleSubmit={props.addPet}
                  status={props.status}
                />
                {props.status.error != null ?
                  <Alert data-testid="alert-error" severity="error">
                      Problem adding your new pet
                  </Alert> : null }
                {props.status.resolved ? (
                    <Alert data-testid="alert-success" severity="success">
                        A new pet has been added
                    </Alert>
                ) : null}
            </Paper>
    )
}

export default PetForm