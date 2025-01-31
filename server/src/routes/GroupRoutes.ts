import { Router } from 'express';
import { GroupController } from '../controllers';

const groupRouter = Router();

// adicionar achar grupo pelo usuário?
groupRouter.post('/', GroupController.createGroup); // criar grupo usando o body
groupRouter.get('/', GroupController.getAllGroups); // pegar todos os grupos
groupRouter.get('/:groupId', GroupController.getGroup); // informacoes de grupo especifico
groupRouter.get('/ranking/:groupId', GroupController.getRanking); // pegar ranking de um grupo
groupRouter.put('/enter/:groupCode/:userId', GroupController.enterGroup); // entrar em um grupo usando código do grupo e id do usuário
groupRouter.put('/leave/:userId', GroupController.leaveGroup); // sair de um grupo
groupRouter.put('/reset/:groupId', GroupController.resetGroup); // resetar o tempo de competicao de um grupo
groupRouter.delete('/:groupId', GroupController.deleteGroup); // deletar grupo

export default groupRouter;
