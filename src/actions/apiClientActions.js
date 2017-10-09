export function loading(type) {
  return {
    type,
  };
}

export function loaded(type, data) {
  return {
    type,
    data,
  };
}

export function error(type, err) {
  return {
    type,
    err,
  };
}
