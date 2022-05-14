const { profile, user } = require("../../models");

exports.getProfile = async (req, res) => {
  try {
    const idUser = req.user.id;

    let data = await profile.findOne({
      where: {
        idUser,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.PATH_FILE + data.image,
    };

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    let dataUser = {
      name: req?.body?.name,
    };

    dataUser = JSON.parse(JSON.stringify(dataUser));
    console.log('get data name User : ', dataUser);

    const updateName = await user.update(
      {
        name: dataUser.name,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    let profileUser = {
      phone: req?.body?.phone,
      gender: req?.body?.gender,
      address: req?.body?.address,
      image: req?.file?.filename,
      // idUser: req.user.id
    };
    console.log(req.body);
    console.log(profileUser);

    profileUser = JSON.parse(JSON.stringify(profileUser));
    console.log('get data profile: ', profileUser);

    const updateProfile = await profile.update(
      {
        ...profileUser,
      },
      {
        where: {
          idUser: req.user.id,
        },
      }
    );

    // console.log(addProfile)

    res.status(200).send({
      status: 'Success',
      data: {
        nameUpdate: updateName,
        profileUpdate: updateProfile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: 'Failed',
      message: 'Server Error',
    });
  }
};