import React from 'react'
require('./index.scss')

export default React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var content = this.refs.content.value.trim();
    if (!content) {
      return;
    }
    var anony = this.refs.cb_anony.checked ? 1:0;
    this.props.publishTopic({content: content,type:1,anony:anony});

    this.refs.content.value = '';
    return;
  },
  render: function() {
    return (
      <div className="topic-form-wrapper">
         <form className="topic-form"  onSubmit={this.handleSubmit}>
          <textarea className="topic-input" type="text" placeholder="Say something..." ref="content" />
          <p className="topic-btn-container">
            <input type="checkbox" name="anony" defaultChecked ref="cb_anony" /><i className="anony_txt">匿名</i>
            <input className="pub-btn" type="submit" value="发布" />
          </p>
        </form>
      </div>
    );
  }
});