import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateCustomId } from '../utils/customCode'; 

const prisma = new PrismaClient();

export const getGroup = async (req: Request, res: Response): Promise<void> => {
  
  const {groupId} = req.params;
  try{ 
    const group = await prisma.groups.findUnique({
      where: {id: groupId},
    });

    if(!group){
      res.status(404).json({message: "Grupo não encontrado"});
      return;
    }

    res.status(200).json(group);

  } catch(error){
    res.status(500).json({
      message: "internal server error", error: (error as Error).message
    });
  }
}

export const enterGroup = async (req: Request, res: Response): Promise<void> => {
  const { groupCode, userId } = req.params;

  try{
    const group = await prisma.groups.findUnique({
      where: {code: groupCode}
    });

    if(!group){
      res.status(404).json({message: "Grupo não encontrado"});
      return;
    }

    const updatedGroup = await prisma.groups.update({
      where: {code: groupCode},
      data:{
        members:{
          connect: {id: userId},
        }
      }
    });
    res.status(200).json(updatedGroup);

  } catch(error){
    res.status(500).json({
      error: "internal server error"
    })
  }
}

export const leaveGroup = async (req: Request, res: Response): Promise<void> => {
  const {userId} = req.params;

  try{
    const user = await prisma.user.findUnique({
      where: {id: userId}
    });

    if(!user){
      res.status(404).json({message: "Usuário não encontradoo"});
      return;
    }

    const updatedUser = await prisma.user.update({
      where: {id: userId},
      data:{
        group:{
          disconnect: true,
        },
      },
    });
    res.status(200).json(updatedUser);

  } catch(error){
    console.log("erro, leaveGroup");
    res.status(500).json({
      error: "internal server error"
    })
  }
}

export const resetGroup = async (req: Request, res: Response): Promise<void> => {
  const {groupId} = req.params;
  try{
    const group = await prisma.groups.findUnique({
      where: {id: groupId}
    });

    if(!group){
      res.status(404).json({message: "Grupo não encontrado"});
      return;
    }

    const duration = (group.duration.getTime() - group.createdAt.getTime());
    const newDate = new Date();
    newDate.setMilliseconds(newDate.getMilliseconds() + duration);

    const updatedGroup = await prisma.groups.update({
      where: {id: groupId},
      data:{
        duration: newDate,
        active: true,
      }
    });
    res.status(200).json({message: "Competição reiniciada", updatedGroup});

  } catch(error){
    res.status(500).json({
      error: "internal server error"
    })
  }
}

export const createGroup = async (req: Request, res: Response): Promise<void> => {
  const {groupName, groupImage, groupDuration, groupType} = req.body;

  if(!groupName || !groupImage || !groupDuration) {
    res.status(400).json("Campo obrigatório não preenchido");
    return;
  }
  
  // lógica para criar o código do grupo e checar se já existe
  let flag = true;
  let uniqueCode = generateCustomId(); // funcao criada em ../utils
  while(flag){
    const group = await prisma.groups.findUnique({
      where: { code: uniqueCode}
    });

    if(!group) flag = false;
    else uniqueCode = generateCustomId();
  }

  try{
    const newGroup = await prisma.groups.create({
      data: {
        code: uniqueCode,
        name: groupName,
        image: groupImage,
        active: true,
        duration: groupDuration,
        type: groupType,
      }
    });
    res.status(200).json(newGroup);

  } catch(error){
    res.status(500).json({
      error: "internal server error"
    })
  }
}

export const deleteGroup = async (req: Request, res: Response): Promise<void> => {
  const { groupId } = req.params;
  try{
    const group = await prisma.groups.findUnique({
      where: {id: groupId}
    });

    if(!group){
      res.status(404).json({message: "Grupo não encontrado"});
      return;
    }

    await prisma.groups.delete({
      where: {id: groupId}
    });

    res.status(200).json({message: "Grupo deletado"});

  } catch(error){
    res.status(500).json({
      error: "internal server error"
    })
  }
}