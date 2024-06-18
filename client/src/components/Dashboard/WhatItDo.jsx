import React from "react";

import whatItDo from "../../utils/WhatItDo";

const WhatItDO = ({ fieldName }) => {
  const message = whatItDo[fieldName];

  return message && <p className="mb-0">{message}</p>;
};

export default WhatItDO;
