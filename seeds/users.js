exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
        username: "2dogs",
        email: "2dogs@gmail.com",
        password: "iam2dogs",
        fullname: "TwoDogs",
        phone: "(880) 880-8888",
        updated_at: new Date(),
        created_at: new Date()
      },
      {
        username: "JZhang",
        email: "jzhang@gmail.com",
        password: "18392648",
        fullname: "Jane Zhang",
        phone: "(760) 398-2918",
        updated_at: new Date(),
        created_at: new Date()
      },
      {
        username: "mike023",
        email: "mikesteven@gmaiil.com",
        password: "disjenfg",
        fullname: "Mike Steven",
        phone: "(760) 982-9380",
        updated_at: new Date(),
        created_at: new Date() 
      },
      {
        username: "huahua",
        email: "huahua@gmail.com",
        password: "sjfeljljs",
        fullname: "Chenyu Hua",
        phone: "(651) 299-2893",
        updated_at: new Date(),
        created_at: new Date()
      },
      {
        username: "gem",
        email: "gem2018@gmail.com",
        password: "alfiejljflsjef",
        fullname: "G.E.M",
        phone: "(789)-890-3849",
        updated_at: new Date(),
        created_at: new Date()
      },
      {
        username: "nana",
        email: "naxie@gmail.com",
        password: "23sjdiflw",
        fullname: "Na Xie",
        phone: "(789)-890-1238",
        updated_at: new Date(),
        created_at: new Date()
      },
      {
        username: "jie",
        email: "jiezhang@gmail.com",
        password: "9080jkjdljfile",
        fullname: "Jie Zhang",
        phone: "(723)-123-1382",
        updated_at: new Date(),
        created_at: new Date()
      }
    ]);
  });
};
