/**
 * Option Tree UI
 *
 * Dependencies: jQuery, jQuery UI, ColorPicker
 *
 * @author Derek Herman (derek@valendesigns.com)
 */
;(function($) {
	OT_UI = {
		processing: false,
		init: function() {
			var $this = this;
			this.init_hide_body();
			this.init_sortable();
			this.init_add();
			this.init_edit();
			this.init_remove();
			this.init_edit_title();
			this.init_edit_id();
			this.init_activate_layout();
			this.init_upload();
			this.init_upload_remove();
			this.init_numeric_slider();
			this.init_tabs();
			this.init_radio_image_select();
			this.init_select_wrapper();
			this.bind_select_wrapper();
			this.fix_upload_parent();
			this.fix_textarea();
			this.replicate_ajax();
			this.reset_settings();
			this.css_editor_mode();
			this.javascript_editor_mode();
			this.reload_colorpicker();
			this.show_warnings();
			this.init_conditions();
			this.init_resize();
			this.init_number_inputs();
		},
		show_warnings: function() {
			$(window).on('load', function() {
				$('.format-settings--with-warning').find('.option-tree-ui-radio:checked').each(function() {
					var _this = $(this);
					var setting = _this.closest('.format-settings--with-warning');
					var checked_value = _this.val();
					setting.attr('data-checked-value', checked_value);
				});
			});
			$('.format-settings--with-warning').find('.option-tree-ui-radio').on('click', function() {
				var _this = $(this);
				var setting = _this.closest('.format-settings--with-warning');
				if (setting.hasClass('format-setting-warning--open')) {
					return false;
				}

				if (setting.hasClass('format-setting-warning--confirm')) {
					setting.removeClass('format-setting-warning--confirm');
					return true;
				}
				var prev_checked_value = setting.attr('data-checked-value');
				setting.attr('data-checked-value', _this.val());
				if (_this.val() === 'on' && prev_checked_value === 'off') {
					var warning = setting.find('.format-setting-warning');
					setting.addClass('format-setting-warning--open');
					warning.show();
					return false;
				}
				return true;
			});
			$('.format-setting-warning__button').on('click', function() {
				var _this = $(this);
				var setting = _this.closest('.format-settings--with-warning');
				var warning = setting.find('.format-setting-warning');
				setting.attr('data-checked-value', 'on');
				setting.removeClass('format-setting-warning--open');
				setting.addClass('format-setting-warning--confirm');
				warning.hide();
				setting.find('.option-tree-ui-radio').first().click();
			});
		},
		init_hide_body: function(elm,type) {
			var css = '.option-tree-setting-body';
			if ( type == 'parent' ) {
				$(css).not( elm.parent().parent().children(css) ).hide();
			} else if ( type == 'child' ) {
				elm.closest('ul').find(css).not( elm.parent().parent().children(css) ).hide();
			} else if ( type == 'child-add' ) {
				elm.children().find(css).hide();
			} else if ( type == 'toggle' ) {
				var body = elm.parent().parent().children(css);
				body.toggle();
				if (body.is(':visible')) {
					body.trigger('option-tree-setting-body-open');
				}
			} else {
				$(css).hide();
			}
		},
		init_remove_active: function(elm,type) {
			var css = '.option-tree-setting-edit';
			if ( type == 'parent' ) {
				$(css).not(elm).removeClass('active');
			} else if ( type == 'child' ) {
				elm.closest('ul').find(css).not(elm).removeClass('active');
			} else if ( type == 'child-add' ) {
				elm.children().find(css).removeClass('active');
			} else {
				$(css).removeClass('active');
			}
		},
		init_sortable: function(scope) {
			scope = scope || document;
			$('.option-tree-sortable', scope).each( function() {
				if ( $(this).children('li').length ) {
					var elm = $(this);
					elm.show();
					elm.sortable({
						items: 'li:not(.ui-state-disabled)',
						handle: 'div.open',
						placeholder: 'ui-state-highlight',
						start: function (event, ui) {
							ui.placeholder.height(ui.item.height()-2);
						},
						stop: function(evt, ui) {
							setTimeout(
								function(){
									OT_UI.update_ids(elm);
								},
								200
							)
						}
					});
				}
			});
		},
		init_add: function() {
			$(document).on('click', '.option-tree-section-add', function(e) {
				e.preventDefault();
				OT_UI.add(this,'section');
			});
			$(document).on('click', '.option-tree-setting-add', function(e) {
				e.preventDefault();
				OT_UI.add(this,'setting');
			});
			$(document).on('click', '.option-tree-help-add', function(e) {
				e.preventDefault();
				OT_UI.add(this,'the_contextual_help');
			});
			$(document).on('click', '.option-tree-choice-add', function(e) {
				e.preventDefault();
				OT_UI.add(this,'choice');
			});
			$(document).on('click', '.option-tree-list-item-add', function(e) {
				e.preventDefault();
				OT_UI.add(this,'list_item');
			});
			$(document).on('click', '.option-tree-social-links-add', function(e) {
				e.preventDefault();
				OT_UI.add(this,'social_links');
			});
			$(document).on('click', '.option-tree-list-item-setting-add', function(e) {
				e.preventDefault();
				if ( $(this).parents('ul').parents('ul').hasClass('ui-sortable') ) {
					$("<div />").text(option_tree.setting_limit).dialog({
						autoOpen: true,
						modal: true,
						dialogClass: 'uncode-modal',
						title: "Confirmation Required",
						minHeight: 500,
						minWidth: 500,
					});
					//alert(option_tree.setting_limit);
					return false;
				}
				OT_UI.add(this,'list_item_setting');
			});
		},
		init_edit: function() {
			$(document).on('click', '.option-tree-setting-edit', function(e) {
				e.preventDefault();
				if ( $(this).parents().hasClass('option-tree-setting-body') ) {
					OT_UI.init_remove_active($(this),'child');
					OT_UI.init_hide_body($(this),'child');
				} else {
					OT_UI.init_remove_active($(this),'parent');
					OT_UI.init_hide_body($(this), 'parent');
				}
				$(this).toggleClass('active');
				OT_UI.init_hide_body($(this), 'toggle');
				$(this).closest('ul').addClass('changed');
			});
		},
		init_remove: function() {
			$(document).on('click', '.option-tree-setting-remove', function(event) {
				event.preventDefault();
				var _this = this,
					list = $(this).parents('ul');
				if ( $(this).parents('li').hasClass('ui-state-disabled') ) {
					$("<div />").text(option_tree.remove_no).dialog({
						autoOpen: true,
						modal: true,
						dialogClass: 'uncode-modal',
						title: "Confirmation Required",
						minHeight: 500,
						minWidth: 500,
					});
					//alert(option_tree.remove_no);
					return false;
				}
				$("<div />").text(option_tree.remove_agree).dialog({
					autoOpen: true,
					modal: true,
					dialogClass: 'uncode-modal',
					title: "Confirmation Required",
					minHeight: 500,
					minWidth: 500,
					buttons : {
						"Confirm" : function() {
							OT_UI.remove(_this);
							setTimeout( function() {
								OT_UI.update_ids(list);
							}, 200 );
							$(this).dialog("close");
						},
						"Cancel" : function() {
							$(this).dialog("close");
						}
					}
				});
				// var agree = confirm(option_tree.remove_agree);
				// if (agree) {
				// 	var list = $(this).parents('ul');
				// 	OT_UI.remove(this);
				// 	setTimeout( function() {
				// 		OT_UI.update_ids(list);
				// 	}, 200 );
				// }
				return false;
			});
		},
		init_edit_title: function() {
			$(document).on('keyup', '.option-tree-setting-title', function() {
				OT_UI.edit_title(this);
			});
			// Automatically fill option IDs with clean versions of their respective option labels
			$(document).on('blur', '.option-tree-setting-title', function() {
				var optionId = $(this).parents('.option-tree-setting-body').find('[type="text"][name$="id]"]')
				if ( optionId.val() === '' ) {
					optionId.val($(this).val().replace(/[^a-z0-9]/gi,'_').toLowerCase());
				}
			});
		},
		init_edit_id: function() {
			$(document).on('keyup', '.section-id', function(){
				OT_UI.update_id(this);
			});
		},
		init_activate_layout: function() {
			$(document).on('click', '.option-tree-layout-activate', function() {
				var active = $(this).parents('.option-tree-setting').find('.open').text();
				$('.option-tree-layout-activate').removeClass('active');
				$(this).toggleClass('active');
				$('.active-layout-input').attr({'value':active});
			});
			$(document).on('change', '#option-tree-options-layouts-form select', function() {
				$("<div />").text(option_tree.activate_layout_agree).dialog({
					autoOpen: true,
					modal: true,
					dialogClass: 'uncode-modal',
					title: "Confirmation Required",
					minHeight: 500,
					minWidth: 500,
					buttons : {
						"Confirm" : function() {
							$('#option-tree-options-layouts-form').submit();
						},
						"Cancel" : function() {
							var active = $('#the_current_layout').attr('value');
							$('#option-tree-options-layouts-form select option[value="' + active + '"]').attr({'selected':'selected'});
							$('#option-tree-options-layouts-form select').prev('span').replaceWith('<span>' + active + '</span>');
							$(this).dialog("close");
						}
					}
				});
				// var agree = confirm(option_tree.activate_layout_agree);
				// if (agree) {
				// 	$('#option-tree-options-layouts-form').submit();
				// } else {
				// 	var active = $('#the_current_layout').attr('value');
				// 	$('#option-tree-options-layouts-form select option[value="' + active + '"]').attr({'selected':'selected'});
				// 	$('#option-tree-options-layouts-form select').prev('span').replaceWith('<span>' + active + '</span>');
				// }
			});
		},
		add: function(elm,type) {
			var self = this,
					list = '',
					list_class = '',
					name = '',
					post_id = 0,
					get_option = '',
					settings = '';
			if ( type == 'the_contextual_help' ) {
				list = $(elm).parent().find('ul:last');
				list_class = 'list-contextual-help';
			} else if ( type == 'choice' ) {
				list = $(elm).parent().children('ul');
				list_class = 'list-choice';
			} else if ( type == 'list_item' ) {
				list = $(elm).parent().children('ul');
				list_class = 'list-sub-setting';
			} else if ( type == 'list_item_setting' ) {
				list = $(elm).parent().children('ul');
				list_class = 'list-sub-setting';
			} else if ( type == 'social_links' ) {
				list = $(elm).parent().children('ul');
				list_class = 'list-sub-setting';
			} else {
				list = $(elm).parent().find('ul:first');
				list_class = ( type == 'section' ) ? 'list-section' : 'list-setting';
			}
			name = list.data('name');
			post_id = list.data('id');
			get_option = list.data('getOption');
			settings = $('#'+name+'_settings_array').val();
			if ( this.processing === false ) {
				this.processing = true;
				var count = parseInt(list.children('li').length);
				if ( type == 'list_item' || type == 'social_links' ) {
					list.find('li input.option-tree-setting-title', self).each(function(){
						var setting = $(this).attr('name'),
								regex = /\[([0-9]+)\]/,
								matches = setting.match(regex),
								id = null != matches ? parseInt(matches[1]) : 0;
						id++;
						if ( id > count) {
							count = id;
						}
					});
				}
				$.ajax({
					url: option_tree.ajax,
					type: 'post',
					data: {
						action: 'add_' + type,
						count: count,
						name: name,
						post_id: post_id,
						get_option: get_option,
						settings: settings,
						type: type
					},
					complete: function( data ) {
						if ( type == 'choice' || type == 'list_item_setting' ) {
							OT_UI.init_remove_active(list,'child-add');
							OT_UI.init_hide_body(list,'child-add');
						} else {
							OT_UI.init_remove_active();
							OT_UI.init_hide_body();
						}
						var listItem = $('<li class="ui-state-default ' + list_class + '">' + data.responseText + '</li>');
						list.append(listItem);
						$('.button_icon_container', listItem).loadIcons();
						list.children().last().find('.option-tree-setting-edit').toggleClass('active');
						list.children().last().find('.option-tree-setting-body').toggle();
						list.children().last().find('.option-tree-setting-title').focus();
						if ( type != 'the_contextual_help' ) {
							OT_UI.update_ids(list);
						}
						OT_UI.init_sortable(listItem);
						OT_UI.init_select_wrapper(listItem);
						OT_UI.init_numeric_slider(listItem);
						OT_UI.parse_condition();

						var input = list.children().last().find('.hide-color-picker');

						if (input.length > 0) {
							OT_UI.bind_colorpicker(input.attr('id'));
							list.children().last().trigger('click');
						}
						self.processing = false;
					}
				});
			}
		},
		remove: function(e) {
			$(e).parent().parent().parent('li').remove();
		},
		edit_title: function(e) {
			if ( this.timer ) {
				clearTimeout(e.timer);
			}
			this.timer = setTimeout( function() {
				$(e).parent().parent().parent().parent().parent().children('.open').text(e.value);
			}, 100);
			return true;
		},
		update_id: function(e) {
			if ( this.timer ) {
				clearTimeout(e.timer);
			}
			this.timer = setTimeout( function() {
				OT_UI.update_ids($(e).parents('ul'));
			}, 100);
			return true;
		},
		update_ids: function(list) {
			var last_section, section, list_items = list.children('li');
			list.addClass('changed');
			list_items.each(function(index) {
				if ( $(this).hasClass('list-section') ) {
					section = $(this).find('.section-id').val().trim().toLowerCase().replace(/[^a-z0-9]/gi,'_');
					if (!section) {
						section = $(this).find('.section-title').val().trim().toLowerCase().replace(/[^a-z0-9]/gi,'_');
					}
					if (!section) {
						section = last_section;
					}
				}
				if ($(this).hasClass('list-setting') ) {
					$(this).find('.hidden-section').attr({'value':section});
				}
				last_section = section;
			});
		},
		condition_objects: function() {
			return 'select, input[type="radio"]:checked, input[type="text"], input[type="hidden"], input.ot-numeric-slider-hidden-input';
		},
		match_conditions: function(condition) {
			var match;
			var regex = /(.+?):(is|not|contains|less_than|less_than_or_equal_to|greater_than|greater_than_or_equal_to)\((.*?)\),?/g;
			var conditions = [];

			while( match = regex.exec( condition ) ) {
				conditions.push({
					'check': match[1],
					'rule':  match[2],
					'value': match[3] || ''
				});
			}

			return conditions;
		},
		parse_condition: function() {
			$( '.format-settings[id^="setting_"][data-condition]' ).each(function() {

				var passed;
				var conditions = OT_UI.match_conditions( $( this ).data( 'condition' ) );
				var operator = ( $( this ).data( 'operator' ) || 'and' ).toLowerCase();

				$.each( conditions, function( index, condition ) {

					var target   = $( '#setting_' + condition.check );
					var targetEl = !! target.length && target.find( OT_UI.condition_objects() ).first();

					if ( ! target.length || ( ! targetEl.length && condition.value.toString() != '' ) ) {
						return;
					}

					var v1 = (targetEl != null && targetEl.length && targetEl.val() != null) ? targetEl.val().toString() : '';
					var v2 = condition.value.toString();
					var result;

					switch ( condition.rule ) {
						case 'less_than':
							result = ( parseInt( v1 ) < parseInt( v2 ) );
							break;
						case 'less_than_or_equal_to':
							result = ( parseInt( v1 ) <= parseInt( v2 ) );
							break;
						case 'greater_than':
							result = ( parseInt( v1 ) > parseInt( v2 ) );
							break;
						case 'greater_than_or_equal_to':
							result = ( parseInt( v1 ) >= parseInt( v2 ) );
							break;
						case 'contains':
							result = ( v1.indexOf(v2) !== -1 ? true : false );
							break;
						case 'is':
							result = ( v1 == v2 );
							break;
						case 'not':
							result = ( v1 != v2 );
							break;
					}

					if ( 'undefined' == typeof passed ) {
						passed = result;
					}

					switch ( operator ) {
						case 'or':
							passed = ( passed || result );
							break;
						case 'and':
						default:
							passed = ( passed && result );
							break;
					}

				});

				if ( passed ) {
					$(this).animate({opacity: 'show' , height: 'show'}, 200);
				} else {
					$(this).animate({opacity: 'hide' , height: 'hide'}, 200);
				}

				delete passed;

			});
		},
		init_conditions: function() {
			var delay = (function() {
				var timer = 0;
				return function(callback, ms) {
					clearTimeout(timer);
					timer = setTimeout(callback, ms);
				};
			})();

			$('.format-settings[id^="setting_"]').on( 'change.conditionals, keyup.conditionals', OT_UI.condition_objects(), function(e) {
				if ($(this).hasClass('wp-color-picker')) {
					return;
				}
				if (e.type === 'keyup') {
					// handle keyup event only once every 500ms
					delay(function() {
						OT_UI.parse_condition();
					}, 500);
				} else {
					OT_UI.parse_condition();
				}
				OT_UI.load_editors();
			});
			OT_UI.parse_condition();
		},
		init_upload: function() {
			$(document).on('click', '.ot_upload_media', function() {
				var field_id            = $(this).parent('.option-tree-ui-upload-parent').find('input').attr('id'),
						post_id             = $(this).attr('rel'),
						save_attachment_id  = $('#'+field_id).hasClass('ot-upload-attachment-id'),
						btnContent          = '';
				if ( window.wp && wp.media ) {
					window.ot_media_frame = window.ot_media_frame || new wp.media.view.MediaFrame.Select({
						title: $(this).attr('title'),
						button: {
							text: option_tree.upload_text
						},
						multiple: false
					});
					window.ot_media_frame.on('select', function() {
						var attachment = window.ot_media_frame.state().get('selection').first(),
								href = attachment.attributes.url,
								attachment_id = attachment.attributes.id,
								mime = attachment.attributes.mime,
								regex = /^image\/(?:jpe?g|png|gif|x-icon)$/i;
						if ( mime.match(regex) || mime == 'image/svg+xml' ) {
							btnContent += '<div class="option-tree-ui-image-wrap"><img src="'+href+'" alt="" /></div>';
						}
						btnContent += '<a href="javascript:(void);" class="option-tree-ui-remove-media option-tree-ui-button button button-secondary light" title="'+option_tree.remove_media_text+'"><span class="icon ot-icon-minus-circle"></span>'+option_tree.remove_media_text+'</a>';
						$('#'+field_id).val( ( save_attachment_id ? attachment_id : href ) );
						$('#'+field_id+'_media').remove();
						$('#'+field_id).parent().parent('div').append('<div class="option-tree-ui-media-wrap" id="'+field_id+'_media" />');
						$('#'+field_id+'_media').append(btnContent).slideDown();
						window.ot_media_frame.off('select');
					}).open();
				} else {
					var backup = window.send_to_editor,
							intval = window.setInterval(
								function() {
									if ( $('#TB_iframeContent').length > 0 && $('#TB_iframeContent').attr('src').indexOf( "&field_id=" ) !== -1 ) {
										$('#TB_iframeContent').contents().find('#tab-type_url').hide();
									}
									$('#TB_iframeContent').contents().find('.savesend .button').val(option_tree.upload_text);
								}, 50);
					tb_show('', 'media-upload.php?post_id='+post_id+'&field_id='+field_id+'&type=image&TB_iframe=1');
					window.send_to_editor = function(html) {
						var href = $(html).find('img').attr('src');
						if ( typeof href == 'undefined') {
							href = $(html).attr('src');
						}
						if ( typeof href == 'undefined') {
							href = $(html).attr('href');
						}
						var image = /\.(?:jpe?g|png|gif|ico)$/i;
						if (href.match(image) && OT_UI.url_exists(href)) {
							btnContent += '<div class="option-tree-ui-image-wrap"><img src="'+href+'" alt="" /></div>';
						}
						btnContent += '<a href="javascript:(void);" class="option-tree-ui-remove-media option-tree-ui-button button button-secondary light" title="'+option_tree.remove_media_text+'"><span class="icon ot-icon-minus-circle"></span>'+option_tree.remove_media_text+'</a>';
						$('#'+field_id).val(href);
						$('#'+field_id+'_media').remove();
						$('#'+field_id).parent().parent('div').append('<div class="option-tree-ui-media-wrap" id="'+field_id+'_media" />');
						$('#'+field_id+'_media').append(btnContent).slideDown();
						OT_UI.fix_upload_parent();
						tb_remove();
						window.clearInterval(intval);
						window.send_to_editor = backup;
					};
				}
				return false;
			});
		},
		init_upload_remove: function() {
			$(document).on('click', '.option-tree-ui-remove-media', function(event) {
				event.preventDefault();

				var _this = this;

				$("<div />").text(option_tree.remove_agree).dialog({
					autoOpen: true,
					modal: true,
					dialogClass: 'uncode-modal',
					title: "Confirmation Required",
					minHeight: 500,
					minWidth: 500,
					buttons : {
						"Confirm" : function() {
							OT_UI.remove_image(_this);
							$(this).dialog("close");
						},
						"Cancel" : function() {
							$(this).dialog("close");
						}
					}
				});

				//var agree = confirm(option_tree.remove_agree);
				// if (agree) {
				// 	OT_UI.remove_image(this);
				// 	return false;
				// }
				// return false;
			});
		},
		init_upload_fix: function(elm) {
			var id  = $(elm).attr('id'),
					val = $(elm).val(),
					img = $(elm).parent().next('.option-tree-ui-media-wrap').find('img'),
					src = img.attr('src'),
					btnContent = '';
			if ( val == src ) {
				return;
			}
			if ( val != src ) {
				img.attr('src', val);
			}
			if ( val !== '' && ( typeof src == 'undefined' || src == false ) && OT_UI.url_exists(val) ) {
				var image = /\.(?:jpe?g|png|gif|ico)$/i;
				if (val.match(image)) {
					btnContent += '<div class="option-tree-ui-image-wrap"><img src="'+val+'" alt="" /></div>';
				}
				btnContent += '<a href="javascript:(void);" class="option-tree-ui-remove-media option-tree-ui-button button button-secondary light" title="'+option_tree.remove_media_text+'"><span class="icon ot-icon-minus-circle">'+option_tree.remove_media_text+'</span></a>';
				$('#'+id).val(val);
				$('#'+id+'_media').remove();
				$('#'+id).parent().parent('div').append('<div class="option-tree-ui-media-wrap" id="'+id+'_media" />');
				$('#'+id+'_media').append(btnContent).slideDown();
			} else if ( val == '' || ! OT_UI.url_exists(val) ) {
				$(elm).parent().next('.option-tree-ui-media-wrap').remove();
			}
		},
	slider_refreshalue: function($value, $el) {
		var $input = $el.closest(".ot-numeric-slider-wrap").find("input"),
			$marker = $el.closest(".ot-numeric-slider-wrap").find(".ot-numeric-slider-helper-input");
		if ($input.attr("id") == '_uncode_scroll_additional_padding') {
			switch (parseInt($value)) {
				case 18:
					$marker.html('0.5x').val('0.5x');
					break;
				case 36:
					$marker.html('1x').val('1x');
					break;
				case 54:
					$marker.html('1.5x').val('1.5x');
					break;
				default:
					$marker.html(0).val(0);
					break;
			}
		} else if ($input.attr("id") == '_uncode_menu_custom_lateral_padding') {
			switch (parseInt($value)) {
				case 72:
					$marker.html('2x').val('2x');
					break;
				case 108:
					$marker.html('3x').val('3x');
					break;
				case 144:
					$marker.html('4x').val('4x');
					break;
				case 180:
					$marker.html('5x').val('5x');
					break;
				case 216:
					$marker.html('6x').val('6x');
					break;
				default:
					$marker.html('1x').val('1x');
					break;
			}
		} else if ($input.attr("id") == '_uncode_product_index_ppp') {
			switch (parseInt($value)) {
				case 0:
					$marker.html('Inherit').val('Inherit');
					break;
				default:
					$marker.html($value).val($value);
					break;
			}
		} else {
			$marker.html($value).val($value);
		}
	},
	init_numeric_slider: function(scope) {
			scope = scope || document;
			$(".ot-numeric-slider-wrap", scope).each(function() {
				var hidden = $(".ot-numeric-slider-hidden-input", this),
						value  = hidden.val(),
						helper = $(".ot-numeric-slider-helper-input", this);
				if ( ! value ) {
					value = hidden.data("min");
					helper.val(value)
				}
				$(".ot-numeric-slider", this).slider({
					range: "min",
					min: hidden.data("min"),
					max: hidden.data("max"),
					step: hidden.data("step"),
					value: value,
					slide: function(event, ui) {
						hidden.add(helper).val(ui.value);//.trigger('change');
						OT_UI.slider_refreshalue(ui.value, $(this));
					},
					stop: function(event, ui) {
						OT_UI.slider_refreshalue(ui.value, $(this));
					},
					create: function(event, ui) {
						hidden.val($(this).slider('value'));
						OT_UI.slider_refreshalue(helper.val(), $(this));
					},
					change: function(event, ui) {
						OT_UI.parse_condition();
						OT_UI.slider_refreshalue(ui.value, $(this));
					}
				});
			});
		},
		init_tabs: function() {
			$(".wrap.settings-wrap .ui-tabs").tabs({
				fx: {
					opacity: "toggle",
					duration: "fast"
				}
			});
			$(".wrap.settings-wrap .ui-tabs a.ui-tabs-anchor").on("click", function(event, ui) {
				var obj = "input[name='_wp_http_referer']";
				if ( $(obj).length > 0 ) {
					var url = $(obj).val(),
							hash = $(this).attr('href');
					if ( url.indexOf("#") != -1 ) {
						var o = url.split("#")[1],
								n = hash.split("#")[1];
						url = url.replace(o, n);
					} else {
						url = url + hash;
					}
					$(obj).val(url);
				}
				OT_UI.run_select_wrapper();
			});
			$('.page-options-header-section').on("click", function(event, ui) {
				$('li[aria-controls="setting__uncode_header_tab"] a').trigger('click');
			});
		},
		init_radio_image_select: function() {
			$(document).on('click', '.option-tree-ui-radio-image', function() {
				$(this).closest('.type-radio-image').find('.option-tree-ui-radio-image').removeClass('option-tree-ui-radio-image-selected');
				$(this).toggleClass('option-tree-ui-radio-image-selected');
				$(this).parent().find('.option-tree-ui-radio').prop('checked', true).trigger('change');
			});
		},
		init_select_wrapper: function(scope) {
			scope = scope || document;
			$('.option-tree-ui-select', scope).each(function () {
				if ( ! $(this).parent().hasClass('select-wrapper') ) {
					$(this).wrap('<div class="select-wrapper" />');
					$(this).parent('.select-wrapper').prepend('<span>' + $(this).find('option:selected').text() + '</span>');
				}
			});
		},
		run_select_wrapper: function() {
			$('.select-with-switching-button .option-tree-ui-select').each(function(){
				var get_link = $(this).find('option:selected').data('link'),
						get_frontend_link = $(this).find('option:selected').data('frontend-link');
				if (get_link != undefined) {
					$(this).closest('.format-setting-inner').addClass('with-button').find('.option-tree-ui-button-switch').removeClass('hidden');
					$(this).closest('.format-setting-inner').find('.link-button a[data-action="edit-frontend"]').attr('href',get_frontend_link);
					$(this).closest('.format-setting-inner').find('.link-button a[data-action="edit-backend"], .link-button a[data-action="edit"]').attr('href',get_link);
				} else {
					$(this).closest('.format-setting-inner').removeClass('with-button').find('.option-tree-ui-button-switch').addClass('hidden');
					// $(this).closest('.format-setting-inner').find('.link-button a').addClass('hidden');
				}
				$(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
			});
		},
		bind_select_wrapper: function() {
			$(document).on('change', '.option-tree-ui-select', function () {
				OT_UI.run_select_wrapper();
			});
		},
		bind_colorpicker: function(field_id) {
			var hide = false;
			var show_swatches = false;
			var $control = $('#' + field_id),
					value = $control.val().replace(/\s+/g, ''),
					alpha_val = 100,
					$alpha, $alpha_output;
			if (value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)) {
					alpha_val = parseFloat(value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)[1]) * 100;
			}
			$control.wpColorPicker({
				clear: function(event, ui) {
					$alpha.val(100);
					$alpha_output.val(100 + '%');
				},
				hide: hide,
				palettes: show_swatches
			});
			$('<div class="vc_alpha-container">' + '<label>Alpha: <output class="rangevalue">' + alpha_val + '%</output></label>' + '<input type="range" min="1" max="100" value="' + alpha_val + '" name="alpha" class="vc_alpha-field">' + '</div>').appendTo($control.parents('.wp-picker-container:first').addClass('vc_color-picker').find('.iris-picker'));
			$alpha = $control.parents('.wp-picker-container:first').find('.vc_alpha-field');
			$alpha_output = $control.parents('.wp-picker-container:first').find('.vc_alpha-container output');
			$alpha.bind('change keyup', function() {
					var alpha_val = parseFloat($alpha.val()),
							iris = $control.data('a8cIris'),
							color_picker = $control.data('wpWpColorPicker');
					$alpha_output.val($alpha.val() + '%');
					iris._color._alpha = alpha_val / 100.0;
					$control.val(iris._color.toString());
					color_picker.toggler.css({
							backgroundColor: $control.val()
					});
					var get_val = $control.val();
					$($control).wpColorPicker('color', get_val);
			}).val(alpha_val).trigger('change');
		},
		reload_colorpicker: function() {
			$('.option-tree-setting-wrap').on('option-tree-setting-body-open', '.option-tree-setting-body', function() {
				var input = $(this).find('.wp-color-picker');
				OT_UI.fix_colorpicker_color(input);
			});
		},
		fix_colorpicker_color: function(input) {
			var value = input.val();

			// I know.....
			input.val("#000001").trigger('change');
			input.val(value).trigger('change');
		},
		bind_gradientpicker: function(field_id) {
				var $control = $('#' + field_id),
					getEdit = $control.closest('.option-tree-setting').find('.option-tree-setting-edit'),
					getHandle = $control.closest('.option-tree-setting').find('.ui-sortable-handle');
				if (getHandle.html() == undefined) {
					OT_UI.init_gradientpicker(field_id);
				} else {
					jQuery(getEdit).on('click', function(){
						OT_UI.init_gradientpicker(field_id);
					});
				}
		},
		init_gradientpicker: function(field_id, container) {
			var container = typeof container === 'undefined' ? 'option-tree-setting' : container;
			var $control = $('#' + field_id);
			jQuery('.gradx_slider').draggable( "destroy" );
			jQuery('.gradient-picker').empty();
			var el = $control,
					inputGradient = $control.closest('.' + container).find('.input-gradient'),
					gradientValue = inputGradient.val(),
					sliders,
					direction,
					type;
			if (gradientValue != '' && gradientValue != null && gradientValue != undefined) {
				gradientValue = JSON.parse(gradientValue);
				sliders = gradientValue.sliders;
				type = gradientValue.type;
				direction = gradientValue.direction;
			} else {
				sliders = [];
				direction = 'left';
				type = 'linear';
			}
			gradX('#' + field_id, {
				type: type,
				direction: direction,
				sliders: sliders
			});
		} ,
		fix_upload_parent: function() {
			$('.option-tree-ui-upload-input').not('.ot-upload-attachment-id').on('focus blur', function(){
				$(this).parent('.option-tree-ui-upload-parent').toggleClass('focus');
				OT_UI.init_upload_fix(this);
			});
		},
		remove_image: function(e) {
			$(e).parent().parent().find('.option-tree-ui-upload-input').attr('value','');
			$(e).parent('.option-tree-ui-media-wrap').remove();
		},
		fix_textarea: function() {
			$('.wp-editor-area').focus( function(){
				$(this).parent('div').css({borderColor:'#bbb'});
			}).blur( function(){
				$(this).parent('div').css({borderColor:'#ccc'});
			});
		},
		replicate_ajax: function() {
			if (location.href.indexOf("#") != -1) {
				var url = $("input[name=\'_wp_http_referer\']").val(),
						hash = location.href.substr(location.href.indexOf("#"));
				$("input[name=\'_wp_http_referer\']").val( url + hash );
				this.scroll_to_top();
			}
			setTimeout( function() {
				$(".wrap.settings-wrap .fade").fadeOut("fast");
			}, 3000 );
		},
		reset_settings: function() {
			$(document).on("click", ".reset-settings", function(event){
				event.preventDefault();
				var $button = event.target,
					$form = $button.closest('form');
				$("<div />").text(option_tree.reset_agree).dialog({
					autoOpen: true,
					modal: true,
					dialogClass: 'uncode-modal',
					title: "Confirmation Required",
					minHeight: 500,
					minWidth: 500,
					buttons : {
						"Confirm" : function() {
							$form.submit();
							$(this).dialog("close");
						},
						"Cancel" : function() {
							$(this).dialog("close");
						}
					}
				});
				/*var agree = confirm(option_tree.reset_agree);
				if (agree) {
					return true;
				} else {
					return false;
				}
				event.preventDefault();*/
			});
		},
		css_editor_mode: function() {
			$('.ot-css-editor').each(function() {
				var editor = ace.edit($(this).attr('id'));
				var this_textarea = $('#textarea_' + $(this).attr('id'));
				editor.setTheme("ace/theme/chrome");
				editor.getSession().setMode("ace/mode/css");
				editor.setShowPrintMargin( false );
				editor.setOptions({
					wrap: true
				});

				editor.getSession().setValue(this_textarea.val());
				editor.getSession().on('change', function(){
					this_textarea.val(editor.getSession().getValue());
				});
				this_textarea.on('change', function(){
					editor.getSession().setValue(this_textarea.val());
				});
			});
		},
		javascript_editor_mode: function() {
			$('.ot-js-editor').each(function() {
				var editor = ace.edit($(this).attr('id'));
				var this_textarea = $('#textarea_' + $(this).attr('id'));
				editor.setTheme("ace/theme/chrome");
				editor.getSession().setMode("ace/mode/javascript");
				editor.setShowPrintMargin( false );
				editor.setOptions({
					wrap: true
				});

				editor.getSession().setValue(this_textarea.val());
				editor.getSession().on('change', function(){
					this_textarea.val(editor.getSession().getValue());
				});
				this_textarea.on('change', function(){
					editor.getSession().setValue(this_textarea.val());
				});
			});
		},
		load_editors: function() {
			OT_UI.css_editor_mode();
			OT_UI.javascript_editor_mode();
		},
		url_exists: function(url) {
			var link = document.createElement('a')
			link.href = url
			if ( link.hostname != window.location.hostname ) {
				return true; // Stop the code from checking across domains.
			}
			var http = new XMLHttpRequest();
			http.open('HEAD', url, false);
			http.send();
			return http.status!=404;
		},
		scroll_to_top: function() {
			setTimeout( function() {
				$(this).scrollTop(0);
			}, 50 );
		},
		close_colorpickers: function() {
			var color_list = $(".format-setting-inner").find("[data-name='_uncode_custom_colors_list']");
			var color_settings = color_list.find('.option-tree-setting-body');

			color_settings.each(function() {
				var _this = $(this);

				if (_this.is(':visible')) {
					var elm = _this.closest('.option-tree-setting').find('.option-tree-setting-edit');

					OT_UI.init_remove_active(elm,'parent');
					OT_UI.init_hide_body(elm, 'toggle');
				}
			});
		},
		init_resize: function() {
			window.addEventListener('resize', function() {
				OT_UI.close_colorpickers();
			});
		},
		init_number_inputs: function() {
			$(document).on('keyup change', '.option-tree-ui-input.force-numer', function () {
				var _this = $(this);
				var value = _this.val();
				var newvalue = parseInt(value.replace(/\D/g,''),10);

				if (value !== newvalue) {
					_this.val(newvalue);
				}
			});
		},
	};
	$(document).ready(function() {
		OT_UI.init();
	});
})(jQuery);

/*!
 * Adds metabox tabs
 */
!function ($) {

	$(document).ready(function() {

		// Loop over the metaboxes
		$('.ot-metabox-wrapper').each( function() {

			// Only if there is a tab option
			if ( $(this).find('.type-tab').length ) {

				// Add .ot-metabox-panels
				$(this).find('.type-tab').parents('.ot-metabox-wrapper').wrapInner('<div class="ot-metabox-panels" />')

				// Wrapp with .ot-metabox-tabs & add .ot-metabox-nav before .ot-metabox-panels
				$(this).find('.ot-metabox-panels').wrap('<div class="ot-metabox-tabs" />').before('<ul class="ot-metabox-nav" />')


				// Loop over settings and build the tabs nav
				$(this).find('.format-settings').each( function() {

					if ( $(this).find('.type-tab').length > 0 ) {

						var title = $(this).find('.type-tab').prev().find('label').html()
							, id = $(this).attr('id')

						// Add a class, hide & append nav item
						$(this).addClass('is-panel').hide()
						$(this).parents('.ot-metabox-panels').prev('.ot-metabox-nav').append('<li><a href="#' + id + '">' + title + '</a></li>')

					}

				})

				// Loop over the panels and wrap and ID them.
				$(this).find('.is-panel').each( function() {
					var id = $(this).attr('id')

					$(this).add( $(this).nextUntil('.is-panel') ).wrapAll('<div id="' + id + '" class="tab-content" />')

				})

				// Create the tabs
				$(this).find('.ot-metabox-tabs').tabs({
					activate: function( event, ui ) {
						var parent = $(this).outerHeight(),
								child = $(this).find('.ot-metabox-panels').outerHeight() + 8,
								minHeight = parent - 34
						if ( $(this).find('.ot-metabox-panels').css('padding') == '12px' && child < parent ) {
							$(this).find('.ot-metabox-panels').css({ minHeight: minHeight })
						}
						OT_UI.load_editors();
					}
				})

				// Move the orphaned settings to the top
				$(this).find('.ot-metabox-panels > .format-settings').prependTo($(this))

				// Remove a bunch of classes to stop style conflicts.
				$(this).find('.ot-metabox-tabs').removeClass('ui-widget ui-widget-content ui-corner-all')
				$(this).find('.ot-metabox-nav').removeClass('ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all')
				$(this).find('.ot-metabox-nav li').removeClass('ui-state-default ui-corner-top ui-tabs-active ui-tabs-active')
				$(this).find('.ot-metabox-nav li').on('mouseenter mouseleave', function() { $(this).removeClass('ui-state-hover') })

				$("#_uncode_page_options .ui-tabs a.ui-tabs-anchor").on("click", function(event, ui) {
					OT_UI.run_select_wrapper();
				});
			}

		})

	})

}(window.jQuery);

/*!
 * Adds theme option tabs
 */
!function ($) {

	$(document).ready(function() {

		// Loop over the theme options
		$('#option-tree-settings-api .inside').each( function() {

			// Only if there is a tab option
			if ( $(this).find('.type-tab').length ) {

				// Add .ot-theme-option-panels
				$(this).find('.type-tab').parents('.inside').wrapInner('<div class="ot-theme-option-panels" />')

				// Wrap with .ot-theme-option-tabs & add .ot-theme-option-nav before .ot-theme-option-panels
				$(this).find('.ot-theme-option-panels').wrap('<div class="ot-theme-option-tabs" />').before('<ul class="ot-theme-option-nav" />')

				// Loop over settings and build the tabs nav
				$(this).find('.format-settings').each( function() {

					if ( $(this).find('.type-tab').length > 0 ) {
						var title = $(this).find('.type-tab').prev().find('.label').text()
							, id = $(this).attr('id')

						// Add a class, hide & append nav item
						$(this).addClass('is-panel').hide()
						$(this).parents('.ot-theme-option-panels').prev('.ot-theme-option-nav').append('<li><a href="#' + id + '">' + title + '</a></li>')

					} else {

					}

				})

				// Loop over the panels and wrap and ID them.
				$(this).find('.is-panel').each( function() {
					var id = $(this).attr('id')

					$(this).add( $(this).nextUntil('.is-panel') ).wrapAll('<div id="' + id + '" class="tab-content" />')

				})

				// Create the tabs
				$(this).find('.ot-theme-option-tabs').tabs({
					activate: function( event, ui ) {
						OT_UI.load_editors();
					}
				})

				// Move the orphaned settings to the top
				$(this).find('.ot-theme-option-panels > .format-settings').prependTo($(this).find('.ot-theme-option-tabs'))

			}

		})

	})

}(window.jQuery);

/*!
 * Fixes the state of metabox radio buttons after a Drag & Drop event.
 */
!function ($) {

	$(document).ready(function() {

		// detect mousedown and store all checked radio buttons
		$('.hndle').on('mousedown', function () {

			// get parent element of .hndle selected.
			// We only need to monitor radios insde the object that is being moved.
			var parent_id = $(this).closest('div').attr('id')

			// set live event listener for mouse up on the content .wrap
			// then give the dragged div time to settle before firing the reclick function
			$('.wrap').on('mouseup', function () {

				var ot_checked_radios = {}

				// loop over all checked radio buttons inside of parent element
				$('#' + parent_id + ' input[type="radio"]').each( function () {

					// stores checked radio buttons
					if ( $(this).is(':checked') ) {

						ot_checked_radios[$(this).attr('name')] = $(this).val()

					}

					// write to the object
					$(document).data('ot_checked_radios', ot_checked_radios)

				})

				// restore all checked radio buttons
				setTimeout( function () {

					// get object of checked radio button names and values
					var checked = $(document).data('ot_checked_radios')

					// step thru each object element and trigger a click on it's corresponding radio button
					for ( key in checked ) {

						$('input[name="' + key + '"]').filter('[value="' + checked[key] + '"]').trigger('click')

					}

					$('.wrap').unbind('mouseup')

				}, 50 )

			})

		})

	})

}(window.jQuery);

/*!
 * Adds opacity to the default colorpicker
 *
 * Derivative work of the Codestar WP Color Picker.
 */
;(function ( $, window, document, undefined ) {
	'use strict';

	// adding alpha support for Automattic Color.js toString function.
	if( typeof Color.fn.toString !== undefined ) {

		Color.fn.toString = function () {

			// check for alpha
			if ( this._alpha < 1 ) {
				return this.toCSS('rgba', this._alpha).replace(/\s+/g, '');
			}

			var hex = parseInt( this._color, 10 ).toString( 16 );

			if ( this.error ) { return ''; }

			// maybe left pad it
			if ( hex.length < 6 ) {
				for (var i = 6 - hex.length - 1; i >= 0; i--) {
					hex = '0' + hex;
				}
			}

			return '#' + hex;

		};

	}

	$.ot_ParseColorValue = function( val ) {

		var value = val.replace(/\s+/g, ''),
				alpha = ( value.indexOf('rgba') !== -1 ) ? parseFloat( value.replace(/^.*,(.+)\)/, '$1') * 100 ) : 100,
				rgba  = ( alpha < 100 ) ? true : false;

		return { value: value, alpha: alpha, rgba: rgba };

	};

	$.fn.ot_wpColorPicker = function() {

		return this.each(function() {

			var $this = $(this);

			// check for rgba enabled/disable
			if( $this.data('rgba') !== false ) {

				// parse value
				var picker = $.ot_ParseColorValue( $this.val() );

				// wpColorPicker core
				$this.wpColorPicker({

					// wpColorPicker: change
					change: function( event, ui ) {

						// update checkerboard background color
						$this.closest('.wp-picker-container').find('.option-tree-opacity-slider-offset').css('background-color', ui.color.toString());
						$this.trigger('keyup');

					},

					// wpColorPicker: create
					create: function( event, ui ) {

						// set variables for alpha slider
						var a8cIris       = $this.data('a8cIris'),
								$container    = $this.closest('.wp-picker-container'),

								// appending alpha wrapper
								$alpha_wrap   = $('<div class="option-tree-opacity-wrap">' +
																	'<div class="option-tree-opacity-slider"></div>' +
																	'<div class="option-tree-opacity-slider-offset"></div>' +
																	'<div class="option-tree-opacity-text"></div>' +
																	'</div>').appendTo( $container.find('.wp-picker-holder') ),

								$alpha_slider = $alpha_wrap.find('.option-tree-opacity-slider'),
								$alpha_text   = $alpha_wrap.find('.option-tree-opacity-text'),
								$alpha_offset = $alpha_wrap.find('.option-tree-opacity-slider-offset');

						// alpha slider
						$alpha_slider.slider({

							// slider: slide
							slide: function( event, ui ) {

								var slide_value = parseFloat( ui.value / 100 );

								// update iris data alpha && wpColorPicker color option && alpha text
								a8cIris._color._alpha = slide_value;
								$this.wpColorPicker( 'color', a8cIris._color.toString() );
								$alpha_text.text( ( slide_value < 1 ? slide_value : '' ) );

							},

							// slider: create
							create: function() {

								var slide_value = parseFloat( picker.alpha / 100 ),
										alpha_text_value = slide_value < 1 ? slide_value : '';

								// update alpha text && checkerboard background color
								$alpha_text.text(alpha_text_value);
								$alpha_offset.css('background-color', picker.value);

								// wpColorPicker clear button for update iris data alpha && alpha text && slider color option
								$container.on('click', '.wp-picker-clear', function() {

									a8cIris._color._alpha = 1;
									$alpha_text.text('');
									$alpha_slider.slider('option', 'value', 100).trigger('slide');

								});

								// wpColorPicker default button for update iris data alpha && alpha text && slider color option
								$container.on('click', '.wp-picker-default', function() {

									var default_picker = $.ot_ParseColorValue( $this.data('default-color') ),
											default_value  = parseFloat( default_picker.alpha / 100 ),
											default_text   = default_value < 1 ? default_value : '';

									a8cIris._color._alpha = default_value;
									$alpha_text.text(default_text);
									$alpha_slider.slider('option', 'value', default_picker.alpha).trigger('slide');

								});

								// show alpha wrapper on click color picker button
								$container.on('click', '.wp-color-result', function() {
									$alpha_wrap.toggle();
								});

								// hide alpha wrapper on click body
								$('body').on( 'click.wpcolorpicker', function() {
									$alpha_wrap.hide();
								});

							},

							// slider: options
							value: picker.alpha,
							step: 1,
							min: 1,
							max: 100

						});
					}

				});

			} else {

				// wpColorPicker default picker
				$this.wpColorPicker({
					change: function() {
						$this.trigger('keyup');
					}
				});

			}

		});

	};

	$(document).ready(function() {
		$('.hide-color-picker.ot-colorpicker-opacity').ot_wpColorPicker();
	});

})( jQuery, window, document );

/*!
 * Avoid to save empty layout.
 */
!function ($) {

	$(document).ready(function() {

		// detect mousedown and store all checked radio buttons
		$('.option-tree-save-layout').each(function(){
			var $form = $(this),
				$input = $('input[name="uncode_layouts[_add_new_layout_]"]', $form),
				$button = $('.option-tree-ui-button.button.save-layout', $form).prop('disabled',true);

			var checkVal = function(){
				if ( $input.val() !== '' )
					$button.prop('disabled',false);
				else
					$button.prop('disabled',true);
			};
			checkVal();

			$form.on('submit', function(){
				checkVal();
			});

			$input.on('change keypress keyup focus blur', function(){
				checkVal();
			});
		})

	})

}(window.jQuery);

/*!
 * Double edit button for Content Blocks.
 */
!function ($) {

	$(document).ready(function() {

		var setButtons = function(){

			var ot_button_edit = window.localStorage['ot_button_edit'];

			var switchButtons = function( action ){
				$('.option-tree-ui-button-switch').each(function(){

					var $wrap = $(this),
						$backend = $('> a.button[data-action="edit-backend"]', $wrap),
						$frontend = $('> a.button[data-action="edit-frontend"]', $wrap);

					if ( action === 'edit-backend') {
						$frontend.before($backend);
					} else {
						$backend.before($frontend);
					}

				});
			};

			if ( typeof ot_button_edit !== 'undefined' ) {
				switchButtons( ot_button_edit );
			}

		};

		setButtons();

		$('.option-tree-ui-button-switch').each(function(){

			var $wrap = $(this),
				$dropdown = $('.dropdown', $wrap);

			$dropdown.on('click', function(){
				$wrap.toggleClass('active');
				$('> a.button', $wrap).on('click', function(e){
					var action = $(this).attr('data-action'),
						ot_button_edit = window.localStorage['ot_button_edit'];
					if ( action !== ot_button_edit ) {
						e.preventDefault();
						$wrap.removeClass('active');
						window.localStorage.setItem('ot_button_edit', action);
						setButtons();
					}
				});
			});

		})

	})

}(window.jQuery);
