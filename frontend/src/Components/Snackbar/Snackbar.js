import React, {Component} from 'react';
import { withStyles, Snackbar} from '@material-ui/core';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import Notificacao from './Notificacao';


class CustomSnackbar extends Component {
    
    render() {
        const { abreNotificacao, mensagemDeResultado, fecharNotificacao, 
                resultadoRequisicao, autoHideDuration} = this.props;
                
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={abreNotificacao}
                autoHideDuration={autoHideDuration || 6000}
                onClose={fecharNotificacao}
            >
                <Notificacao
                    onClose={fecharNotificacao}
                    variantsnack={resultadoRequisicao}
                    message={mensagemDeResultado}
                />
            </Snackbar>
        )
    }
};

const styles = theme => ({
});

export default withStyles(styles)(CustomSnackbar);