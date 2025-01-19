import { Router } from 'express';
import * as controllers from '../controllers/index';

const router = Router();

router.route('/').get((_, res) => {
  res.status(200).send('Made with 💚 and &lt; &#x0002F; &gt; by bookworms');
});

//adicionar achar grupo pelo usuário?
router.get('/:groupId/GroupInfo', controllers.getGroup);              // informacoes grupo especifico
router.put('/:groupCode/:userId/enterGroup', controllers.enterGroup); // entrar em um grupo usando código do grupo e id do usuário
router.put('/:userId/leaveGroup', controllers.leaveGroup);            // sair de um grupo
router.put('/:groupId/resetGroup', controllers.resetGroup);           // resetar o tempo de competicao de um grupo
router.post('/createGroup', controllers.createGroup);                 // criar grupo usando o body
router.delete('/:groupId/deleteGroup', controllers.deleteGroup);      // deletar grupo
export default router;
