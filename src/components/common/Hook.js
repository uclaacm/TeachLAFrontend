import React, { useEffect, useState } from "react";
import "styles/Footer.scss";

const fetchURL = props => {
  const onError = props.onError || function() {};

  const onStart = props.onStart || function() {};
  onStart();

  try {
    fetch(props.url, props.options)
      .then(response => {
        const onComplete = props.onComplete || function() {};
        onComplete();

        if (response.status !== 200) {
          onError(response);
          return {};
        }

        return response.json();
      })
      .then(json => {
        try {
          const onSuccess = props.onSuccess || function() {};
          onSuccess(json);
        } catch (err) {
          console.error(err);
          onError(err);
        }
      })
      .catch(err => {
        console.error(err);
        onError(err);
      });
  } catch (err) {
    console.error(err);
    onError(err);
  }
};

/*
    Props:
        interval
        url
        onSuccess
        onError
        onStart
        onFailure
*/
export default props => {
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    if (timer) {
      timer.stopInterval();
      setTimer(
        setInterval(() => {
          fetchURL(props);
        }),
        props.interval,
      );
    }
  }, [props.interval, props.url, props.onSuccess]);

  useEffect(() => {
    setTimer(
      setInterval(() => {
        fetchURL(props);
      }),
      props.interval,
    );

    return () => {
      if (timer) {
        timer.stopInterval();
      }
    };
  }, []);

  return null;
};
