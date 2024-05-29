'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['api::delivery.delivery'],

      async afterCreate(event) {
        try {
          
          const delivery = await strapi.db.query('api::delivery.delivery').findOne({
            where: {
              id: event?.result?.id
            },
            populate:["customer", "campaign"]
          })

          const data = {
            "title": `${delivery?.campaign?.name || "Nova entrega"}`,
            "message": "Entregáveis adicionados",
            "user": delivery?.customer,
            "link": `dashboard/campaing/details/${delivery?.campaign?.id}`,
          }

          await strapi.db.query('api::notification.notification').create({
            data
          })


        } catch (error) {
          console.error(error)
        }
      },
    });
  },
};
