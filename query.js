module.exports = (query) => {
    const result = {};
    if (query.title) {
      result.title = { $regex: query.title, $options: "i" };
    }
    if (query.description) {
      result.description = { $regex: query.description, $options: "i" };
    }
    if (query.category) {
      result.category = { $regex: query.category, $options: "i" };
    }
    if (query.tags) {
      result.tags = { $regex: query.tags, $options: "i" };
    }
    
    if (query.price) {
      result.price = { $lte: query.price };
    }
  
    if (query.author) {
      result.author = query.author;
    }
  
    if (query.created) {
      const year = new Date().getFullYear();
      const month = new Date().getMonth();
      const day = new Date().getDay();
  
      switch (query.date) {
        case "today":
          result.year = year;
          result.month = month;
          result.day = day;
          break;
  
        case "month":
          result.year = year;
          result.month = month;
          break;
  
        case "year":
          result.year = year;
          break;
      }
    }
    return result;
  };