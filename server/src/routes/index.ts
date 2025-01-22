import { Router } from 'express';
import { GroupControllers } from '../controllers/index';

const router = Router();

router.route('/').get((_, res) => {
  res.status(200).send('Made with 💚 and &lt; &#x0002F; &gt; by bookworms');
});

//adicionar achar grupo pelo usuário?
router.get('/:groupId/GroupInfo', GroupControllers.getGroup);              // informacoes grupo especifico
router.put('/:groupCode/:userId/enterGroup', GroupControllers.enterGroup); // entrar em um grupo usando código do grupo e id do usuário
router.put('/:userId/leaveGroup', GroupControllers.leaveGroup);            // sair de um grupo
router.put('/:groupId/resetGroup', GroupControllers.resetGroup);           // resetar o tempo de competicao de um grupo
router.post('/createGroup', GroupControllers.createGroup);                 // criar grupo usando o body
router.delete('/:groupId/deleteGroup', GroupControllers.deleteGroup);      // deletar grupo

export default router;
