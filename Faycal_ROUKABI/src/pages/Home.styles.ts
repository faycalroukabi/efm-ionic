
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    background : '#7b7b7b75'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontColor: '#000000'
  },
  iconButton: {
    padding: 10,
    backgroundColor:'#7b7b7b75'
  },
  divider: {
    height: 28,
    margin: 4,
  },

}));