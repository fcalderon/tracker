import React from 'react';

export const TimeBlockForm = props => {
  return (
    <form>
      <div className={'card'}>
        <div className={'card-header'}>
          {!!props.title ? props.title : 'Time Block Form'}
        </div>
        <div className={'card-body'}>
          <div className="form-group">
            <label htmlFor="start-date-field">Start time</label>
            <input
              type="datetime-local"
              className="form-control"
              id="start-date-field"
              value={props.model.start_time.substring(
                0,
                props.model.start_time.length - 1
              )}
              onChange={event => {
                props.model.start_time = new Date(
                  event.target.value
                ).toISOString();
                onChange(props);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-date-field">End time</label>
            <input
              type="datetime-local"
              className="form-control"
              id="end-date-field"
              value={props.model.end_time.substring(
                0,
                props.model.end_time.length - 1
              )}
              onChange={event => {
                props.model.end_time = new Date(
                  event.target.value
                ).toISOString();
                onChange(props);
              }}
            />
          </div>
        </div>
        <div className={'card-footer'}>
          <button
            type={'button'}
            className={'btn btn-primary'}
            onClick={() => props.onSubmit(props.model)}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

function onChange(props) {
  if (props.onChange) {
    props.onChange(props.model);
  }
}
