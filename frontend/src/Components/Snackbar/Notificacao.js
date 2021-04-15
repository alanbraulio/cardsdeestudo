import React from 'react';
import classNames from "classnames";    
import PropTypes from 'prop-types';
import amber from "@material-ui/core/colors/amber";
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
      backgroundColor: '#48ad16'
  },
  error: {
      backgroundColor: '#ed3434'
  },
  info: {
      backgroundColor: '#296cf2'
  },
  warning: {
      backgroundColor: amber[700]
  },
  icon: {
      fontSize: 20
  },
  iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit
  },
  message: {
      display: "flex",
      alignItems: "center"
  }
});

const Notificacao = (props) => {
    const { classes, className, message, onClose, variantsnack, ...other } = props;
    const Icon = variantIcon[variantsnack];
  
    return (
      <SnackbarContent
        className={classNames(classes[variantsnack], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }
  
  Notificacao.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variantsnack: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  };

  export default withStyles(styles)(Notificacao);