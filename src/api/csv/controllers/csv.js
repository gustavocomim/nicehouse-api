'use strict';

var Json2csvParser = require('json2csv').Parser;


module.exports = {
  download: async (ctx) => {
    try {
      let { table, filter, omit, prep } = ctx.request.query;
    
      if(!table) {
        return badRequest("table is empty");
      }
      const model = strapi.db.config.models.find( model => model.collectionName === table );
      var data =  await strapi.db.query(model?.uid).findMany(JSON.parse(filter || "{}"));

      if(omit) {
        const omitParse = (obj, arr) =>
          Object.keys(obj)
            .filter(k => !arr.includes(k))
            .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
            
        omit = JSON.parse(omit)
        
        data = data.map(item => omitParse(item, omit));

      }

      if(prep) {
        prep = JSON.parse(prep);

        data = data.map(item => ({...prep, ...item}))

      }

      if(data?.length > 0) {
        let columns = [];
        let listColumns = strapi.db.config.models.find(f => f.uid === model.uid)
        for(var i of Object.keys(listColumns?.attributes)) {
          columns.push(i);
        }

        const json2csvParser = new Json2csvParser({ columns });
        const csv = json2csvParser.parse(data);

        ctx.response.attachment("data.csv")
        ctx.response.type = 'text/csv; charset=utf-8';
        ctx.body = csv
      }

    } catch (error) {
      ctx.badRequest(error);

    }
  }
};

