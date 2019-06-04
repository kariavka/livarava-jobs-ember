import DS from "ember-data";
import {computed, get} from "@ember/object";

export default DS.Model.extend({
  // Attributes
  title: DS.attr('string'),
  header: DS.attr('string'),
  summary: DS.attr('string'),
  description: DS.attr('string'),
  url: DS.attr('string'),
  location: DS.attr('string'),
  type_location: DS.attr('string'),
  price: DS.attr('number'),
  online: DS.attr('boolean'),
  language: DS.attr('string'),

  // Stats
  weight: DS.attr('number'),
  views: DS.attr('number'),
  subscriber_count: DS.attr('number'),  // Subscribers count
  comment_count: DS.attr('number'), // Comments count
  axon_count: DS.attr('number'),  // Axons count

  // Datetime
  created: DS.attr('datetime'),
  updated: DS.attr('datetime'),
  startdate: DS.attr('date'),
  enddate: DS.attr('date'),

  // Type
  type: DS.attr('string'),
  typeLabel: computed('type', function () {
    let type = get('type');
    return type[0].toUpperCase() + type.slice(1, type.length);
  }),

  // Display
  display: DS.attr('string'),

  // Icon
  icon_url: DS.attr('string'),

  // Image
  image_url: DS.attr('string'),

  // Video
  video_type: DS.attr('string'),
  video_url: DS.attr('string'),
  video_embed_url: DS.attr('string'),

  // Link
  link_url: computed('type', 'title', function () {
    let type = get('type');
    let url = get('title');
    return (type === 'link') ? `/goto/?url=${encodeURIComponent(url)}` : null;
  }),

  // Author
  author: DS.belongsTo('user'),
});
