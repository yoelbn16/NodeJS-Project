import {
  getAllCards,
  getCardById,
  getAllMyCards,
  createCard,
  updateCard,
  updateLikeCard,
  deleteCard,
} from "../model/dbAdaptor.js";
import errorHandler from "../utils/handleError.js";
import debug from "debug";
const log = debug("app:cardsContoller");
import checkCardBizNum from "../utils/checkCardBizNum.js";

const creatCardController = async (req, res) => {
  try {
    const userId = req.userData._id;
    req.body.user_id = userId;
    let newCard = await createCard(req.body);
    return res.json(newCard);
  } catch (error) {
    log(err);
    errorHandler(res, 400, err.message);
  }
};
const getAllCardsController = async (req, res) => {
  try {
    let cards = await getAllCards();
    res.json(cards);
  } catch (err) {
    log(err);
  }
};

const getCardByIdController = async (req, res) => {
  try {
    let cards = await getCardById(req.params.id);
    res.json(cards);
  } catch (err) {
    log(err);
    errorHandler(res, 400, err.message);
  }
};

const getAllMyCardsController = async (req, res) => {
  try {
    let myCards = await getAllMyCards(req.userData._id);
    return res.json(myCards);
  } catch (err) {
    log(err);
    errorHandler(res, 400, err.message);
  }
};

const updateCardController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);

    let { user_id } = cardFromDb;
    user_id = user_id + "";
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    if (req.userData.isBusiness && req.userData._id !== user_id) {
      throw new Error(
        "You are not allowed to update this card, you must be the owner of the card"
      );
    }
    const updatedCard = await updateCard(req.params.id, req.body);
    return res.json(updatedCard);
  } catch (err) {
    log(err);
    errorHandler(res, 400, err.message);
  }
};

const patchLikeController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let likes = [...cardFromDb.likes];
    if (likes.includes(req.userData._id)) {
      likes = likes.filter((id) => id !== req.userData._id);
    } else {
      likes.push(req.userData._id);
    }
    const updatedCardFromDb = await updateLikeCard(req.params.id, likes);
    return res.json(updatedCardFromDb);
  } catch (err) {
    log(err);
    errorHandler(res, 400, err.message);
  }
};

const patchBizNumberController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    const bizNumber = await checkCardBizNum(req.body.bizNumber);
    if (bizNumber && bizNumber._id != req.params.id) {
      throw new Error("bizNumber already exist!");
    }
    cardFromDb.bizNumber = req.body.bizNumber;
    let updatedCard = await updateCard(req.params.id, cardFromDb);
    return res.json(updatedCard);
  } catch (err) {
    log(err);
    errorHandler(res, 400, err.message);
  }
};

const deleteCardController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let { user_id } = cardFromDb;
    user_id = user_id + "";
    if (req.userData.isBusiness && req.userData._id !== user_id) {
      throw new Error(
        "You are not allowed to update this card, you must be the owner of the card"
      );
    }
    const cardAfterDeleteFromDb = await deleteCard(req.params.id);
    return res.json(cardAfterDeleteFromDb);
  } catch (err) {
    log(err);
    errorHandler(res, 400, err.message);
  }
};

export {
  getAllCardsController,
  getCardByIdController,
  getAllMyCardsController,
  creatCardController,
  updateCardController,
  patchLikeController,
  patchBizNumberController,
  deleteCardController,
};
