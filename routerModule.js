const express = require("express");
const router = express.Router();

const Notice = require("./NoticeModel");

const authorizationMiddleware = require("./authorizationMiddlewere");

const query = require("./query");

router.get("/noticeboard", async (req, res, next) => {
  try {
    const notices = await Notice.find(query(req.query));

    res.send(notices);
  } catch (error) {
    next(error);
  }
});

router.get("/noticeboard/:id", async (req, res, next) => {
  try {
    const id  = req.params.id;
    const notice = await Notice.findById(id);

    res.format({
      "text/plain": () => {
        res.send(`Title: ${notice.title}\nDescription: ${notice.description}`);
      },
      "text/html": () => {
        res.send(`<h1>${notice.title}</h1><p>${notice.description}</p>`);
      },
      "application/json": () => {
        res.send(notice);
      },
    });
    res.send(notice);
  } catch (error) {
    next(error);
  }
});

router.post("/noticeboard",authorizationMiddleware, async (req, res, next) => {
  try {
    const notice = new Notice(req.body)
    notice.user = req.user;
    await notice.save();
    res.send(notice);
  } catch (error) {
    next(error);
  }
});

router.delete("/noticeboard/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteNotice = await Notice.findByIdAndDelete(id);
    deleteNotice.save();

    res.send(deleteNotice);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/noticeboard/:id",
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const updateNotice = await Notice.findByIdAndUpdate(
        id,
        { title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          tags: req.body.tags,
          price: req.body.price },
        { omitUndefined: true }
      )

      updateNotice.save();

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/heartbeat", (req, res) => {
  const currentDate = new Date();
  res.send(`Current date and time: ${currentDate}`);
});

module.exports = router;