import './Appli.scss';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Accueil from './Accueil';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import {firestore} from '../firebase';
import AjouterDossier from './AjouterDossier';

export default function Appli() {
  // État de l'utilisateur
  const [utilisateur, setUtilisateur] = useState(null);

  // État des dossiers
  const etatDossiers = useState([]);
  const [dossiers, setDossiers] = etatDossiers;

  // État de la boîte de dialogue "Ajout Dossier"
  const [ouvert, setOuvert] = useState(false);

  // Valider la connexion utilisateur
  useEffect(
    () => {
     firebase.auth().onAuthStateChanged(
       util => {
        setUtilisateur(util);
        // Créer le profil de l'utilisateur dans Firestore si util n'est pas NULL
        if(util) {
          firestore.collection('utilisateurs-ex4').doc(util.uid).set({
            nom: util.displayName, 
            courriel: util.email, 
            datecompte: firebase.firestore.FieldValue.serverTimestamp()
          }, {merge: true});
        }
      }
     );
    }, []
  );
  
  // Ajouter un dossier
  function gererAjout(nom, couverture, couleur) {
    // Objet à ajouter dans la collection "dossiers" sur Firestore
    const objDossier = {
      nom: nom,
      couverture: couverture,
      couleur: couleur,
      datemodif: firebase.firestore.FieldValue.serverTimestamp(),
      signets: []
    };
    // Ajout de l'objet
    firestore.collection('utilisateurs-ex4').doc(utilisateur.uid).collection('dossiers').add(objDossier).then(
      refDoc => {
        // Puis on utilise la référence retournée pour chercher le détail du dossier
        refDoc.get().then(
          // Et on modifie l'état des dossiers en joignant ce dernier pour forcer un "rerender" du composant "ListeDossiers"
          doc => setDossiers([...dossiers, {...doc.data(), id: doc.id}])
        );
        // On oublie pas de fermer la boîte de dialogue
        setOuvert(false);
      }
    )
  }

  return (
    <div className="Appli">
      {
        // Un utilisateur est connecté ?
        utilisateur ?
          <>
            <Entete utilisateur={utilisateur} />
            <section className="contenu-principal">
              <ListeDossiers utilisateur={utilisateur} etatDossiers={etatDossiers} />
              <AjouterDossier ouvert={ouvert} setOuvert={setOuvert} gererAjout={gererAjout} />
              <Fab onClick={() => setOuvert(true)} className="ajoutRessource" color="primary" aria-label="Ajouter dossier">
                <AddIcon />
              </Fab>
            </section>
          </>
        // Sinon :
        :
          <Accueil />
      }
    </div>
  );
}
