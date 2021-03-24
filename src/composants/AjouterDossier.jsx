import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { TwitterPicker } from 'react-color';

export default function AjouterDossier({ouvert, setOuvert, gererAjout}) {
  const [nom, setNom] = useState('');
  const [couverture, setCouverture] = useState('');
  const [couleur, setCouleur] = useState('#537169');

  function viderChamps() {
    setNom('');
    setCouverture('');
    setCouleur('#537169');
  }

  return (
    <div className="AjouterDossier">
      <Dialog open={ouvert} onClose={()=>setOuvert(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter un dossier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nomDossier"
            label="Nom du dossier"
            type="text"
            fullWidth
            onChange={(e) => setNom(e.target.value)}
            defaultValue={nom}
          />
          <TextField 
            margin="normal"
            id="urlImage"
            label="Adresse de l'image de couverture"
            type="text"
            fullWidth
            onChange={(e) => setCouverture(e.target.value)}
            defaultValue={couverture}
          />
          <TwitterPicker 
            width="100%" 
            triangle="hide" 
            onChangeComplete={(couleur, e) => setCouleur(couleur.hex)}
            color={couleur}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOuvert(false); viderChamps()}} variant="contained" color="primary" style={{backgroundColor: '#8B0000'}}>
            Annuler
          </Button>
          <Button onClick={() => {nom !== '' && gererAjout(nom, couverture, couleur); viderChamps(); }} variant="contained" color="primary" style={{backgroundColor: '#009933'}}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}