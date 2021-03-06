import { Meteor } from 'meteor/meteor';
import { hasPermission } from 'meteor/rocketchat:authorization';
import { OAuthApps } from 'meteor/rocketchat:models';

Meteor.publish('oauthApps', function() {
	if (!this.userId) {
		return this.ready();
	}
	if (!hasPermission(this.userId, 'manage-oauth-apps')) {
		this.error(Meteor.Error('error-not-allowed', 'Not allowed', { publish: 'oauthApps' }));
	}
	return OAuthApps.find();
});
