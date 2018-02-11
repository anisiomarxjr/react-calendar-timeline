'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSubHeaderLabelFormats = exports.defaultHeaderLabelFormats = exports.defaultTimeSteps = exports.defaultKeys = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('./Timeline.css');

var _Items = require('./items/Items');

var _Items2 = _interopRequireDefault(_Items);

var _InfoLabel = require('./layout/InfoLabel');

var _InfoLabel2 = _interopRequireDefault(_InfoLabel);

var _Sidebar = require('./layout/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Header = require('./layout/Header');

var _Header2 = _interopRequireDefault(_Header);

var _VerticalLines = require('./lines/VerticalLines');

var _VerticalLines2 = _interopRequireDefault(_VerticalLines);

var _HorizontalLines = require('./lines/HorizontalLines');

var _HorizontalLines2 = _interopRequireDefault(_HorizontalLines);

var _TodayLine = require('./lines/TodayLine');

var _TodayLine2 = _interopRequireDefault(_TodayLine);

var _CursorLine = require('./lines/CursorLine');

var _CursorLine2 = _interopRequireDefault(_CursorLine);

var _calendar = require('./utility/calendar');

var _throttleDebounce = require('throttle-debounce');

var _window = require('../resize-detector/window');

var _window2 = _interopRequireDefault(_window);

var _domHelpers = require('./utility/dom-helpers');

var _generic = require('./utility/generic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultKeys = exports.defaultKeys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time'
};

var defaultTimeSteps = exports.defaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1
};

var defaultHeaderLabelFormats = exports.defaultHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM/YY',
  monthMedium: 'MM/YYYY',
  monthMediumLong: 'MMM YYYY',
  monthLong: 'MMMM YYYY',
  dayShort: 'L',
  dayLong: 'dddd, LL',
  hourShort: 'HH',
  hourMedium: 'HH:00',
  hourMediumLong: 'L, HH:00',
  hourLong: 'dddd, LL, HH:00',
  time: 'LLL'
};

var defaultSubHeaderLabelFormats = exports.defaultSubHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM',
  monthMedium: 'MMM',
  monthLong: 'MMMM',
  dayShort: 'D',
  dayMedium: 'dd D',
  dayMediumLong: 'ddd, Do',
  dayLong: 'dddd, Do',
  hourShort: 'HH',
  hourLong: 'HH:00',
  minuteShort: 'mm',
  minuteLong: 'HH:mm'
};

var ReactCalendarTimeline = function (_Component) {
  _inherits(ReactCalendarTimeline, _Component);

  _createClass(ReactCalendarTimeline, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        getTimelineContext: function getTimelineContext() {
          var _state = _this2.state,
              width = _state.width,
              visibleTimeStart = _state.visibleTimeStart,
              visibleTimeEnd = _state.visibleTimeEnd;

          //TODO: Performance
          //prob wanna memoize this so we ensure that if no items changed,
          //we return same context reference

          return {
            timelineWidth: width,
            visibleTimeStart: visibleTimeStart,
            visibleTimeEnd: visibleTimeEnd
          };
        }
      };
    }
  }]);

  function ReactCalendarTimeline(props) {
    _classCallCheck(this, ReactCalendarTimeline);

    var _this = _possibleConstructorReturn(this, (ReactCalendarTimeline.__proto__ || Object.getPrototypeOf(ReactCalendarTimeline)).call(this, props));

    _initialiseProps.call(_this);

    var visibleTimeStart = null;
    var visibleTimeEnd = null;

    if (_this.props.defaultTimeStart && _this.props.defaultTimeEnd) {
      visibleTimeStart = _this.props.defaultTimeStart.valueOf();
      visibleTimeEnd = _this.props.defaultTimeEnd.valueOf();
    } else if (_this.props.visibleTimeStart && _this.props.visibleTimeEnd) {
      visibleTimeStart = _this.props.visibleTimeStart;
      visibleTimeEnd = _this.props.visibleTimeEnd;
    } else {
      visibleTimeStart = Math.min.apply(Math, _toConsumableArray(_this.props.items.map(function (item) {
        return (0, _generic._get)(item, 'start').getTime();
      })));
      visibleTimeEnd = Math.max.apply(Math, _toConsumableArray(_this.props.items.map(function (item) {
        return (0, _generic._get)(item, 'end').getTime();
      })));

      if (!visibleTimeStart || !visibleTimeEnd) {
        visibleTimeStart = new Date().getTime() - 86400 * 7 * 1000;
        visibleTimeEnd = new Date().getTime() + 86400 * 7 * 1000;
      }

      if (_this.props.onTimeInit) {
        _this.props.onTimeInit(visibleTimeStart, visibleTimeEnd);
      }
    }

    _this.state = {
      width: 1000,

      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      canvasTimeStart: visibleTimeStart - (visibleTimeEnd - visibleTimeStart),

      headerPosition: 'top',

      selectedItem: null,
      dragTime: null,
      dragGroupTitle: null,
      resizeTime: null,
      isDragging: false,
      topOffset: 0,
      resizingItem: null,
      resizingEdge: null
    };

    var _this$stackItems = _this.stackItems(props.items, props.groups, _this.state.canvasTimeStart, _this.state.visibleTimeStart, _this.state.visibleTimeEnd, _this.state.width),
        dimensionItems = _this$stackItems.dimensionItems,
        height = _this$stackItems.height,
        groupHeights = _this$stackItems.groupHeights,
        groupTops = _this$stackItems.groupTops;

    /* eslint-disable react/no-direct-mutation-state */


    _this.state.dimensionItems = dimensionItems;
    _this.state.height = height;
    _this.state.groupHeights = groupHeights;
    _this.state.groupTops = groupTops;

    /* eslint-enable */
    return _this;
  }

  _createClass(ReactCalendarTimeline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resize(this.props);

      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.addListener(this);
      }

      _window2.default.addListener(this);

      this.lastTouchDistance = null;

      window.addEventListener('scroll', this.scrollEventListener);

      this.scrollComponent.addEventListener('touchstart', this.touchStart);
      this.scrollComponent.addEventListener('touchmove', this.touchMove);
      this.scrollComponent.addEventListener('touchend', this.touchEnd);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.removeListener(this);
      }

      _window2.default.removeListener(this);

      window.removeEventListener('scroll', this.scrollEventListener);

      this.scrollComponent.removeEventListener('touchstart', this.touchStart);
      this.scrollComponent.removeEventListener('touchmove', this.touchMove);
      this.scrollComponent.removeEventListener('touchend', this.touchEnd);
    }

    // called on window scroll. it's job is to figure out if we should fix or float the header

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var visibleTimeStart = nextProps.visibleTimeStart,
          visibleTimeEnd = nextProps.visibleTimeEnd,
          items = nextProps.items,
          groups = nextProps.groups,
          sidebarWidth = nextProps.sidebarWidth;


      if (visibleTimeStart && visibleTimeEnd) {
        this.updateScrollCanvas(visibleTimeStart, visibleTimeEnd, items !== this.props.items || groups !== this.props.groups, items, groups);
      } else if (items !== this.props.items || groups !== this.props.groups) {
        this.updateDimensions(items, groups);
      }

      // resize if the sidebar width changed
      if (sidebarWidth !== this.props.sidebarWidth && items && groups) {
        this.resize(nextProps);
      }
    }
  }, {
    key: 'updateDimensions',
    value: function updateDimensions(items, groups) {
      var _state2 = this.state,
          canvasTimeStart = _state2.canvasTimeStart,
          visibleTimeStart = _state2.visibleTimeStart,
          visibleTimeEnd = _state2.visibleTimeEnd,
          width = _state2.width;

      var _stackItems = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width),
          dimensionItems = _stackItems.dimensionItems,
          height = _stackItems.height,
          groupHeights = _stackItems.groupHeights,
          groupTops = _stackItems.groupTops;

      this.setState({ dimensionItems: dimensionItems, height: height, groupHeights: groupHeights, groupTops: groupTops });
    }

    // called when the visible time changes

  }, {
    key: 'zoomIn',
    value: function zoomIn(e) {
      e.preventDefault();

      this.changeZoom(0.75);
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut(e) {
      e.preventDefault();

      this.changeZoom(1.25);
    }
  }, {
    key: 'changeZoom',
    value: function changeZoom(scale) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
      var _props = this.props,
          minZoom = _props.minZoom,
          maxZoom = _props.maxZoom;

      var oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var newZoom = Math.min(Math.max(Math.round(oldZoom * scale), minZoom), maxZoom); // min 1 min, max 20 years
      var newVisibleTimeStart = Math.round(this.state.visibleTimeStart + (oldZoom - newZoom) * offset);

      this.props.onTimeChange(newVisibleTimeStart, newVisibleTimeStart + newZoom, this.updateScrollCanvas);
    }

    // TODO: this is very similar to timeFromItemEvent, aside from which element to get offsets
    // from.  Look to consolidate the logic for determining coordinate to time
    // as well as generalizing how we get time from click on the canvas

  }, {
    key: 'todayLine',
    value: function todayLine(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) {
      return _react2.default.createElement(_TodayLine2.default, {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _generic._length)(this.props.groups),
        height: height,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'cursorLine',
    value: function cursorLine(cursorTime, canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) {
      return _react2.default.createElement(_CursorLine2.default, {
        cursorTime: cursorTime,
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _generic._length)(this.props.groups),
        height: height,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'verticalLines',
    value: function verticalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, headerHeight) {
      return _react2.default.createElement(_VerticalLines2.default, {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _generic._length)(this.props.groups),
        minUnit: minUnit,
        timeSteps: timeSteps,
        fixedHeader: this.props.fixedHeader,
        height: height,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'horizontalLines',
    value: function horizontalLines(canvasWidth, groupHeights, headerHeight) {
      return _react2.default.createElement(_HorizontalLines2.default, {
        canvasWidth: canvasWidth,
        lineCount: (0, _generic._length)(this.props.groups),
        groupHeights: groupHeights,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'items',
    value: function items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops) {
      return _react2.default.createElement(_Items2.default, {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineCount: (0, _generic._length)(this.props.groups),
        dimensionItems: dimensionItems,
        minUnit: minUnit,
        groupHeights: groupHeights,
        groupTops: groupTops,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        selectedItem: this.state.selectedItem,
        dragSnap: this.props.dragSnap,
        minResizeWidth: this.props.minResizeWidth,
        canChangeGroup: this.props.canChangeGroup,
        canMove: this.props.canMove,
        canResize: this.props.canResize,
        useResizeHandle: this.props.useResizeHandle,
        canSelect: this.props.canSelect,
        moveResizeValidator: this.props.moveResizeValidator,
        topOffset: this.state.topOffset,
        itemSelect: this.selectItem,
        itemDrag: this.dragItem,
        itemDrop: this.dropItem,
        onItemDoubleClick: this.doubleClickItem,
        onItemContextMenu: this.contextMenuClickItem,
        itemResizing: this.resizingItem,
        itemResized: this.resizedItem,
        itemRenderer: this.props.itemRenderer,
        selected: this.props.selected
      });
    }
  }, {
    key: 'infoLabel',
    value: function infoLabel() {
      var label = null;

      if (this.state.dragTime) {
        label = (0, _moment2.default)(this.state.dragTime).format('LLL') + ', ' + this.state.dragGroupTitle;
      } else if (this.state.resizeTime) {
        label = (0, _moment2.default)(this.state.resizeTime).format('LLL');
      }

      return label ? _react2.default.createElement(_InfoLabel2.default, { label: label }) : '';
    }
  }, {
    key: 'header',
    value: function header(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, headerLabelGroupHeight, headerLabelHeight) {
      return _react2.default.createElement(_Header2.default, {
        canvasTimeStart: canvasTimeStart,
        hasRightSidebar: this.props.rightSidebarWidth > 0,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        minUnit: minUnit,
        timeSteps: timeSteps,
        headerLabelGroupHeight: headerLabelGroupHeight,
        headerLabelHeight: headerLabelHeight,
        width: this.state.width,
        zoom: zoom,
        visibleTimeStart: this.state.visibleTimeStart,
        visibleTimeEnd: this.state.visibleTimeEnd,
        headerPosition: this.state.headerPosition,
        fixedHeader: this.props.fixedHeader,
        stickyOffset: this.props.stickyOffset,
        showPeriod: this.showPeriod,
        headerLabelFormats: this.props.headerLabelFormats,
        subHeaderLabelFormats: this.props.subHeaderLabelFormats
      });
    }
  }, {
    key: 'sidebar',
    value: function sidebar(height, groupHeights, headerHeight) {
      return _react2.default.createElement(
        _Sidebar2.default,
        {
          groups: this.props.groups,
          groupRenderer: this.props.groupRenderer,
          keys: this.props.keys,
          width: this.props.sidebarWidth,
          lineHeight: this.props.lineHeight,
          groupHeights: groupHeights,
          height: height,
          headerHeight: headerHeight,
          headerPosition: this.state.headerPosition,
          stickyOffset: this.props.stickyOffset,
          fixedHeader: this.props.fixedHeader
        },
        this.props.sidebarContent
      );
    }
  }, {
    key: 'rightSidebar',
    value: function rightSidebar(height, groupHeights, headerHeight) {
      return _react2.default.createElement(
        _Sidebar2.default,
        {
          groups: this.props.groups,
          keys: this.props.keys,
          isRightSidebar: true,
          width: this.props.rightSidebarWidth,
          lineHeight: this.props.lineHeight,
          groupHeights: groupHeights,
          height: height,
          headerHeight: headerHeight,
          headerPosition: this.state.headerPosition,
          stickyOffset: this.props.stickyOffset,
          fixedHeader: this.props.fixedHeader
        },
        this.props.rightSidebarContent
      );
    }
  }, {
    key: 'stackItems',
    value: function stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width) {
      // if there are no groups return an empty array of dimensions
      if (groups.length === 0) {
        return {
          dimensionItems: [],
          height: 0,
          groupHeights: [],
          groupTops: []
        };
      }

      var _props2 = this.props,
          keys = _props2.keys,
          dragSnap = _props2.dragSnap,
          lineHeight = _props2.lineHeight,
          headerLabelGroupHeight = _props2.headerLabelGroupHeight,
          headerLabelHeight = _props2.headerLabelHeight,
          stackItems = _props2.stackItems,
          fullUpdate = _props2.fullUpdate,
          itemHeightRatio = _props2.itemHeightRatio;
      var _state3 = this.state,
          draggingItem = _state3.draggingItem,
          dragTime = _state3.dragTime,
          resizingItem = _state3.resizingItem,
          resizingEdge = _state3.resizingEdge,
          resizeTime = _state3.resizeTime,
          newGroupOrder = _state3.newGroupOrder;

      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var headerHeight = headerLabelGroupHeight + headerLabelHeight;

      var visibleItems = (0, _calendar.getVisibleItems)(items, canvasTimeStart, canvasTimeEnd, keys);
      var groupOrders = (0, _calendar.getGroupOrders)(groups, keys);

      var dimensionItems = visibleItems.reduce(function (memo, item) {
        var itemId = (0, _generic._get)(item, keys.itemIdKey);
        var isDragging = itemId === draggingItem;
        var isResizing = itemId === resizingItem;

        var dimension = (0, _calendar.calculateDimensions)({
          itemTimeStart: (0, _generic._get)(item, keys.itemTimeStartKey),
          itemTimeEnd: (0, _generic._get)(item, keys.itemTimeEndKey),
          isDragging: isDragging,
          isResizing: isResizing,
          canvasTimeStart: canvasTimeStart,
          canvasTimeEnd: canvasTimeEnd,
          canvasWidth: canvasWidth,
          dragSnap: dragSnap,
          dragTime: dragTime,
          resizingEdge: resizingEdge,
          resizeTime: resizeTime,
          fullUpdate: fullUpdate,
          visibleTimeStart: visibleTimeStart,
          visibleTimeEnd: visibleTimeEnd
        });

        if (dimension) {
          dimension.top = null;
          dimension.order = isDragging ? newGroupOrder : groupOrders[(0, _generic._get)(item, keys.itemGroupKey)];
          dimension.stack = !item.isOverlay;
          dimension.height = lineHeight * itemHeightRatio;
          dimension.isDragging = isDragging;

          memo.push({
            id: itemId,
            dimensions: dimension
          });
        }

        return memo;
      }, []);

      var stackingMethod = stackItems ? _calendar.stack : _calendar.nostack;

      var _stackingMethod = stackingMethod(dimensionItems, groupOrders, lineHeight, headerHeight),
          height = _stackingMethod.height,
          groupHeights = _stackingMethod.groupHeights,
          groupTops = _stackingMethod.groupTops;

      return { dimensionItems: dimensionItems, height: height, groupHeights: groupHeights, groupTops: groupTops };
    }
  }, {
    key: 'handleDropJucca',
    value: function handleDropJucca(e) {
      console.log('drop drop drop');
    }
  }, {
    key: 'childrenWithProps',
    value: function childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, headerHeight, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps) {
      if (!this.props.children) {
        return null;
      }

      // convert to an array and remove the nulls
      var childArray = Array.isArray(this.props.children) ? this.props.children.filter(function (c) {
        return c;
      }) : [this.props.children];

      var childProps = {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        dimensionItems: dimensionItems,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        // TODO: combine these two
        groupHeights: groupHeights,
        groupTops: groupTops,
        selected: this.state.selectedItem && !this.props.selected ? [this.state.selectedItem] : this.props.selected || [],
        height: height,
        headerHeight: headerHeight,
        minUnit: minUnit,
        timeSteps: timeSteps
      };

      return _react2.default.Children.map(childArray, function (child) {
        return _react2.default.cloneElement(child, childProps);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          items = _props3.items,
          groups = _props3.groups,
          headerLabelGroupHeight = _props3.headerLabelGroupHeight,
          headerLabelHeight = _props3.headerLabelHeight,
          sidebarWidth = _props3.sidebarWidth,
          rightSidebarWidth = _props3.rightSidebarWidth,
          timeSteps = _props3.timeSteps,
          showCursorLine = _props3.showCursorLine;
      var _state4 = this.state,
          draggingItem = _state4.draggingItem,
          resizingItem = _state4.resizingItem,
          isDragging = _state4.isDragging,
          width = _state4.width,
          visibleTimeStart = _state4.visibleTimeStart,
          visibleTimeEnd = _state4.visibleTimeEnd,
          canvasTimeStart = _state4.canvasTimeStart,
          mouseOverCanvas = _state4.mouseOverCanvas,
          cursorTime = _state4.cursorTime;
      var _state5 = this.state,
          dimensionItems = _state5.dimensionItems,
          height = _state5.height,
          groupHeights = _state5.groupHeights,
          groupTops = _state5.groupTops;


      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var minUnit = (0, _calendar.getMinUnit)(zoom, width, timeSteps);
      var headerHeight = headerLabelGroupHeight + headerLabelHeight;

      if (draggingItem || resizingItem) {
        var stackResults = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width);
        dimensionItems = stackResults.dimensionItems;
        height = stackResults.height;
        groupHeights = stackResults.groupHeights;
        groupTops = stackResults.groupTops;
      }

      var outerComponentStyle = {
        height: height + 'px'
      };

      var scrollComponentStyle = {
        width: width + 'px',
        height: height + 20 + 'px',
        cursor: isDragging ? 'move' : 'default'
      };

      var canvasComponentStyle = {
        width: canvasWidth + 'px',
        height: height + 'px'
      };

      return _react2.default.createElement(
        'div',
        {
          style: this.props.style,
          ref: function ref(el) {
            return _this3.container = el;
          },
          className: 'react-calendar-timeline'
        },
        _react2.default.createElement(
          'div',
          { style: outerComponentStyle, className: 'rct-outer' },
          sidebarWidth > 0 ? this.sidebar(height, groupHeights, headerHeight) : null,
          _react2.default.createElement(
            'div',
            {
              ref: function ref(el) {
                return _this3.scrollComponent = el;
              },
              className: 'rct-scroll',
              style: scrollComponentStyle,
              onScroll: this.onScroll,
              onWheel: this.onWheel,
              onMouseDown: this.handleMouseDown,
              onMouseMove: this.handleMouseMove,
              onMouseUp: this.handleMouseUp,
              onMouseLeave: this.handleMouseLeave,
              onDrop: this.handleDropFromOutside,
              onDragOver: this.handleDragOver
            },
            _react2.default.createElement(
              'div',
              {
                ref: function ref(el) {
                  return _this3.canvasComponent = el;
                },
                className: 'rct-canvas',
                style: canvasComponentStyle,
                onDoubleClick: this.handleDoubleClick,
                onMouseEnter: this.handleCanvasMouseEnter,
                onMouseLeave: this.handleCanvasMouseLeave,
                onMouseMove: this.handleCanvasMouseMove,
                onContextMenu: this.handleCanvasContextMenu
              },
              this.items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops),
              this.verticalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, headerHeight),
              this.horizontalLines(canvasWidth, groupHeights, headerHeight),
              this.todayLine(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight),
              mouseOverCanvas && showCursorLine ? this.cursorLine(cursorTime, canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) : null,
              this.infoLabel(),
              this.header(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, headerLabelGroupHeight, headerLabelHeight),
              this.childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, headerHeight, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps)
            )
          ),
          rightSidebarWidth > 0 ? this.rightSidebar(height, groupHeights, headerHeight) : null
        )
      );
    }
  }]);

  return ReactCalendarTimeline;
}(_react.Component);

ReactCalendarTimeline.propTypes = {
  groups: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,
  items: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,
  sidebarWidth: _propTypes2.default.number,
  sidebarContent: _propTypes2.default.node,
  rightSidebarWidth: _propTypes2.default.number,
  rightSidebarContent: _propTypes2.default.node,
  dragSnap: _propTypes2.default.number,
  minResizeWidth: _propTypes2.default.number,
  fixedHeader: _propTypes2.default.oneOf(['fixed', 'sticky', 'none']),
  stickyOffset: _propTypes2.default.number,
  fullUpdate: _propTypes2.default.bool,
  lineHeight: _propTypes2.default.number,
  headerLabelGroupHeight: _propTypes2.default.number,
  headerLabelHeight: _propTypes2.default.number,
  itemHeightRatio: _propTypes2.default.number,

  minZoom: _propTypes2.default.number,
  maxZoom: _propTypes2.default.number,

  clickTolerance: _propTypes2.default.number,

  canChangeGroup: _propTypes2.default.bool,
  canMove: _propTypes2.default.bool,
  canResize: _propTypes2.default.oneOf([true, false, 'left', 'right', 'both']),
  useResizeHandle: _propTypes2.default.bool,
  canSelect: _propTypes2.default.bool,

  stackItems: _propTypes2.default.bool,

  traditionalZoom: _propTypes2.default.bool,
  showCursorLine: _propTypes2.default.bool,

  itemTouchSendsClick: _propTypes2.default.bool,

  onItemMove: _propTypes2.default.func,
  onItemResize: _propTypes2.default.func,
  onItemClick: _propTypes2.default.func,
  onItemSelect: _propTypes2.default.func,
  onItemDeselect: _propTypes2.default.func,
  onCanvasClick: _propTypes2.default.func,
  onItemDoubleClick: _propTypes2.default.func,
  onItemContextMenu: _propTypes2.default.func,
  onCanvasDoubleClick: _propTypes2.default.func,
  onCanvasContextMenu: _propTypes2.default.func,
  onCanvasMouseEnter: _propTypes2.default.func,
  onCanvasMouseLeave: _propTypes2.default.func,
  onCanvasMouseMove: _propTypes2.default.func,

  moveResizeValidator: _propTypes2.default.func,

  itemRenderer: _propTypes2.default.func,
  groupRenderer: _propTypes2.default.func,

  dayBackground: _propTypes2.default.func,

  style: _propTypes2.default.object,

  keys: _propTypes2.default.shape({
    groupIdKey: _propTypes2.default.string,
    groupTitleKey: _propTypes2.default.string,
    groupRightTitleKey: _propTypes2.default.string,
    itemIdKey: _propTypes2.default.string,
    itemTitleKey: _propTypes2.default.string,
    itemDivTitleKey: _propTypes2.default.string,
    itemGroupKey: _propTypes2.default.string,
    itemTimeStartKey: _propTypes2.default.string,
    itemTimeEndKey: _propTypes2.default.string
  }),

  timeSteps: _propTypes2.default.shape({
    second: _propTypes2.default.number,
    minute: _propTypes2.default.number,
    hour: _propTypes2.default.number,
    day: _propTypes2.default.number,
    month: _propTypes2.default.number,
    year: _propTypes2.default.number
  }),

  defaultTimeStart: _propTypes2.default.object,
  defaultTimeEnd: _propTypes2.default.object,

  visibleTimeStart: _propTypes2.default.number,
  visibleTimeEnd: _propTypes2.default.number,
  onTimeChange: _propTypes2.default.func,
  onTimeInit: _propTypes2.default.func,
  onBoundsChange: _propTypes2.default.func,

  selected: _propTypes2.default.array,

  headerLabelFormats: _propTypes2.default.shape({
    yearShort: _propTypes2.default.string,
    yearLong: _propTypes2.default.string,
    monthShort: _propTypes2.default.string,
    monthMedium: _propTypes2.default.string,
    monthMediumLong: _propTypes2.default.string,
    monthLong: _propTypes2.default.string,
    dayShort: _propTypes2.default.string,
    dayLong: _propTypes2.default.string,
    hourShort: _propTypes2.default.string,
    hourMedium: _propTypes2.default.string,
    hourMediumLong: _propTypes2.default.string,
    hourLong: _propTypes2.default.string
  }),

  subHeaderLabelFormats: _propTypes2.default.shape({
    yearShort: _propTypes2.default.string,
    yearLong: _propTypes2.default.string,
    monthShort: _propTypes2.default.string,
    monthMedium: _propTypes2.default.string,
    monthLong: _propTypes2.default.string,
    dayShort: _propTypes2.default.string,
    dayMedium: _propTypes2.default.string,
    dayMediumLong: _propTypes2.default.string,
    dayLong: _propTypes2.default.string,
    hourShort: _propTypes2.default.string,
    hourLong: _propTypes2.default.string,
    minuteShort: _propTypes2.default.string,
    minuteLong: _propTypes2.default.string
  }),

  resizeDetector: _propTypes2.default.shape({
    addListener: _propTypes2.default.func,
    removeListener: _propTypes2.default.func
  }),

  children: _propTypes2.default.node
};
ReactCalendarTimeline.defaultProps = {
  sidebarWidth: 150,
  rightSidebarWidth: 0,
  dragSnap: 1000 * 60 * 15, // 15min
  minResizeWidth: 20,
  fixedHeader: 'sticky', // fixed or sticky or none
  stickyOffset: 0,
  fullUpdate: true,
  lineHeight: 30,
  headerLabelGroupHeight: 30,
  headerLabelHeight: 30,
  itemHeightRatio: 0.65,

  minZoom: 60 * 60 * 1000, // 1 hour
  maxZoom: 5 * 365.24 * 86400 * 1000, // 5 years

  clickTolerance: 3, // how many pixels can we drag for it to be still considered a click?

  canChangeGroup: true,
  canMove: true,
  canResize: 'right',
  useResizeHandle: false,
  canSelect: true,

  stackItems: false,

  traditionalZoom: false,
  showCursorLine: false,

  onItemMove: null,
  onItemResize: null,
  onItemClick: null,
  onItemSelect: null,
  onItemDeselect: null,
  onCanvasClick: null,
  onItemDoubleClick: null,
  onItemContextMenu: null,
  onCanvasMouseEnter: null,
  onCanvasMouseLeave: null,
  onCanvasMouseMove: null,

  moveResizeValidator: null,

  dayBackground: null,

  defaultTimeStart: null,
  defaultTimeEnd: null,

  itemTouchSendsClick: false,

  style: {},
  keys: defaultKeys,
  timeSteps: defaultTimeSteps,

  // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
  // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
  visibleTimeStart: null,
  visibleTimeEnd: null,
  onTimeChange: function onTimeChange(visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  },
  // called after the calendar loads and the visible time has been calculated
  onTimeInit: null,
  // called when the canvas area of the calendar changes
  onBoundsChange: null,
  children: null,

  headerLabelFormats: defaultHeaderLabelFormats,
  subHeaderLabelFormats: defaultSubHeaderLabelFormats,

  selected: null
};
ReactCalendarTimeline.childContextTypes = {
  getTimelineContext: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.scrollEventListener = function () {
    var _props4 = _this4.props,
        headerLabelGroupHeight = _props4.headerLabelGroupHeight,
        headerLabelHeight = _props4.headerLabelHeight;

    var headerHeight = headerLabelGroupHeight + headerLabelHeight;

    var rect = _this4.container.getBoundingClientRect();

    if (rect.top > _this4.props.stickyOffset) {
      _this4.setState({ headerPosition: 'top' });
    } else if (rect.bottom < headerHeight + _this4.props.stickyOffset) {
      _this4.setState({ headerPosition: 'bottom' });
    } else {
      _this4.setState({ headerPosition: 'fixed' });
    }
  };

  this.touchStart = function (e) {
    if (e.touches.length === 2) {
      e.preventDefault();

      _this4.lastTouchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);
      _this4.singleTouchStart = null;
      _this4.lastSingleTouch = null;
    } else if (e.touches.length === 1) {
      e.preventDefault();

      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      _this4.lastTouchDistance = null;
      _this4.singleTouchStart = { x: x, y: y, screenY: window.pageYOffset };
      _this4.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset };
    }
  };

  this.touchMove = function (e) {
    if (_this4.state.dragTime || _this4.state.resizeTime) {
      e.preventDefault();
      return;
    }
    if (_this4.lastTouchDistance && e.touches.length === 2) {
      e.preventDefault();

      var touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);

      var parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);
      var xPosition = (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x;

      if (touchDistance !== 0 && _this4.lastTouchDistance !== 0) {
        _this4.changeZoom(_this4.lastTouchDistance / touchDistance, xPosition / _this4.state.width);
        _this4.lastTouchDistance = touchDistance;
      }
    } else if (_this4.lastSingleTouch && e.touches.length === 1) {
      e.preventDefault();

      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      var deltaX = x - _this4.lastSingleTouch.x;
      // let deltaY = y - this.lastSingleTouch.y

      var deltaX0 = x - _this4.singleTouchStart.x;
      var deltaY0 = y - _this4.singleTouchStart.y;

      _this4.lastSingleTouch = { x: x, y: y };

      var moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0);
      var moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0);

      if (deltaX !== 0 && moveX) {
        _this4.scrollComponent.scrollLeft -= deltaX;
      }
      if (moveY) {
        window.scrollTo(window.pageXOffset, _this4.singleTouchStart.screenY - deltaY0);
      }
    }
  };

  this.touchEnd = function (e) {
    if (_this4.lastTouchDistance) {
      e.preventDefault();

      _this4.lastTouchDistance = null;
    }
    if (_this4.lastSingleTouch) {
      e.preventDefault();

      _this4.lastSingleTouch = null;
      _this4.singleTouchStart = null;
    }
  };

  this.resize = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this4.props;

    var _container$getBoundin = _this4.container.getBoundingClientRect(),
        containerWidth = _container$getBoundin.width,
        containerTop = _container$getBoundin.top;

    var width = containerWidth - props.sidebarWidth - props.rightSidebarWidth;

    var _stackItems2 = _this4.stackItems(props.items, props.groups, _this4.state.canvasTimeStart, _this4.state.visibleTimeStart, _this4.state.visibleTimeEnd, width),
        dimensionItems = _stackItems2.dimensionItems,
        height = _stackItems2.height,
        groupHeights = _stackItems2.groupHeights,
        groupTops = _stackItems2.groupTops;

    _this4.setState({
      width: width,
      topOffset: containerTop + window.pageYOffset,
      dimensionItems: dimensionItems,
      height: height,
      groupHeights: groupHeights,
      groupTops: groupTops
    });
    _this4.scrollComponent.scrollLeft = width;
  };

  this.onScroll = function () {
    var scrollComponent = _this4.scrollComponent;
    var canvasTimeStart = _this4.state.canvasTimeStart;
    var scrollX = scrollComponent.scrollLeft;
    var zoom = _this4.state.visibleTimeEnd - _this4.state.visibleTimeStart;
    var width = _this4.state.width;
    var visibleTimeStart = canvasTimeStart + zoom * scrollX / width;

    // move the virtual canvas if needed
    if (scrollX < _this4.state.width * 0.5) {
      _this4.setState({
        canvasTimeStart: _this4.state.canvasTimeStart - zoom
      });
      scrollComponent.scrollLeft += _this4.state.width;
    }
    if (scrollX > _this4.state.width * 1.5) {
      _this4.setState({
        canvasTimeStart: _this4.state.canvasTimeStart + zoom
      });
      scrollComponent.scrollLeft -= _this4.state.width;
    }

    if (_this4.state.visibleTimeStart !== visibleTimeStart || _this4.state.visibleTimeEnd !== visibleTimeStart + zoom) {
      _this4.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this4.updateScrollCanvas);
    }
  };

  this.updateScrollCanvas = function (visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, updatedItems, updatedGroups) {
    var oldCanvasTimeStart = _this4.state.canvasTimeStart;
    var oldZoom = _this4.state.visibleTimeEnd - _this4.state.visibleTimeStart;
    var newZoom = visibleTimeEnd - visibleTimeStart;
    var items = updatedItems || _this4.props.items;
    var groups = updatedGroups || _this4.props.groups;
    var fullUpdate = _this4.props.fullUpdate;


    var newState = {
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd
    };

    var resetCanvas = false;

    var canKeepCanvas = visibleTimeStart >= oldCanvasTimeStart + oldZoom * 0.5 && visibleTimeStart <= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd >= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd <= oldCanvasTimeStart + oldZoom * 2.5;

    // if new visible time is in the right canvas area
    if (canKeepCanvas) {
      // but we need to update the scroll
      var newScrollLeft = Math.round(_this4.state.width * (visibleTimeStart - oldCanvasTimeStart) / newZoom);
      if (_this4.scrollComponent.scrollLeft !== newScrollLeft) {
        resetCanvas = true;
      }
    } else {
      resetCanvas = true;
    }

    if (resetCanvas) {
      // Todo: need to calculate new dimensions
      newState.canvasTimeStart = visibleTimeStart - newZoom;
      _this4.scrollComponent.scrollLeft = _this4.state.width;

      if (_this4.props.onBoundsChange) {
        _this4.props.onBoundsChange(newState.canvasTimeStart, newState.canvasTimeStart + newZoom * 3);
      }
    }

    if (resetCanvas || forceUpdateDimensions || fullUpdate) {
      var canvasTimeStart = newState.canvasTimeStart ? newState.canvasTimeStart : oldCanvasTimeStart;

      var _stackItems3 = _this4.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, _this4.state.width, fullUpdate),
          dimensionItems = _stackItems3.dimensionItems,
          height = _stackItems3.height,
          groupHeights = _stackItems3.groupHeights,
          groupTops = _stackItems3.groupTops;

      newState.dimensionItems = dimensionItems;
      newState.height = height;
      newState.groupHeights = groupHeights;
      newState.groupTops = groupTops;
    }

    _this4.setState(newState);
  };

  this.zoomWithWheel = function (speed, xPosition, deltaY) {
    _this4.changeZoom(1.0 + speed * deltaY / 500, xPosition / _this4.state.width);
  };

  this.onWheel = function (e) {
    var traditionalZoom = _this4.props.traditionalZoom;


    e.preventDefault();

    // zoom in the time dimension
    if (e.ctrlKey || e.metaKey || e.altKey) {
      var parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);
      var xPosition = e.clientX - parentPosition.x;

      var speed = e.ctrlKey ? 10 : e.metaKey ? 3 : 1;

      _this4.zoomWithWheel(speed, xPosition, e.deltaY);

      // convert vertical zoom to horiziontal
    } else if (e.shiftKey) {
      var scrollComponent = _this4.scrollComponent;
      scrollComponent.scrollLeft += e.deltaY;

      // no modifier pressed? we prevented the default event, so scroll or zoom as needed
    } else {
      if (e.deltaX !== 0) {
        if (!traditionalZoom) {
          _this4.scrollComponent.scrollLeft += e.deltaX;
        }
      }
      if (e.deltaY !== 0) {
        window.scrollTo(window.pageXOffset, window.pageYOffset + e.deltaY);
        if (traditionalZoom) {
          var _parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);
          var _xPosition = e.clientX - _parentPosition.x;

          _this4.zoomWithWheel(10, _xPosition, e.deltaY);
        }
      }
    }
  };

  this.showPeriod = function (from, unit) {
    var visibleTimeStart = from.valueOf();
    var visibleTimeEnd = (0, _moment2.default)(from).add(1, unit).valueOf();
    var zoom = visibleTimeEnd - visibleTimeStart;

    // can't zoom in more than to show one hour
    if (zoom < 360000) {
      return;
    }

    // clicked on the big header and already focused here, zoom out
    if (unit !== 'year' && _this4.state.visibleTimeStart === visibleTimeStart && _this4.state.visibleTimeEnd === visibleTimeEnd) {
      var nextUnit = (0, _calendar.getNextUnit)(unit);

      visibleTimeStart = from.startOf(nextUnit).valueOf();
      visibleTimeEnd = (0, _moment2.default)(visibleTimeStart).add(1, nextUnit);
      zoom = visibleTimeEnd - visibleTimeStart;
    }

    _this4.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this4.updateScrollCanvas);
  };

  this.selectItem = function (item, clickType, e) {
    if (_this4.state.selectedItem === item || _this4.props.itemTouchSendsClick && clickType === 'touch') {
      if (item && _this4.props.onItemClick) {
        var time = _this4.timeFromItemEvent(e);
        _this4.props.onItemClick(item, e, time);
      }
    } else {
      _this4.setState({ selectedItem: item });
      if (item && _this4.props.onItemSelect) {
        var _time = _this4.timeFromItemEvent(e);
        _this4.props.onItemSelect(item, e, _time);
      } else if (item === null && _this4.props.onItemDeselect) {
        _this4.props.onItemDeselect(e); // this isnt in the docs. Is this function even used?
      }
    }
  };

  this.doubleClickItem = function (item, e) {
    if (_this4.props.onItemDoubleClick) {
      var time = _this4.timeFromItemEvent(e);
      _this4.props.onItemDoubleClick(item, e, time);
    }
  };

  this.contextMenuClickItem = function (item, e) {
    if (_this4.props.onItemContextMenu) {
      var time = _this4.timeFromItemEvent(e);
      _this4.props.onItemContextMenu(item, e, time);
    }
  };

  this.rowAndTimeFromScrollAreaEvent = function (e) {
    var _props5 = _this4.props,
        headerLabelGroupHeight = _props5.headerLabelGroupHeight,
        headerLabelHeight = _props5.headerLabelHeight,
        dragSnap = _props5.dragSnap;
    var _state6 = _this4.state,
        width = _state6.width,
        groupHeights = _state6.groupHeights,
        visibleTimeStart = _state6.visibleTimeStart,
        visibleTimeEnd = _state6.visibleTimeEnd;

    var lineCount = (0, _generic._length)(_this4.props.groups);

    // get coordinates relative to the component
    var parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);

    var x = e.clientX - parentPosition.x;
    var y = e.clientY - parentPosition.y;

    // calculate the y coordinate from `groupHeights` and header heights
    var row = 0;
    var remainingHeight = y - headerLabelGroupHeight - headerLabelHeight;

    while (row < lineCount && remainingHeight - groupHeights[row] > 0) {
      remainingHeight -= groupHeights[row];
      row += 1;
    }

    // calculate the x (time) coordinate taking the dragSnap into account
    var time = Math.round(visibleTimeStart + x / width * (visibleTimeEnd - visibleTimeStart));
    time = Math.floor(time / dragSnap) * dragSnap;

    return [row, time];
  };

  this.timeFromItemEvent = function (e) {
    var _state7 = _this4.state,
        width = _state7.width,
        visibleTimeStart = _state7.visibleTimeStart,
        visibleTimeEnd = _state7.visibleTimeEnd;
    var dragSnap = _this4.props.dragSnap;


    var scrollComponent = _this4.scrollComponent;

    var _scrollComponent$getB = scrollComponent.getBoundingClientRect(),
        scrollX = _scrollComponent$getB.x;

    var xRelativeToTimeline = e.clientX - scrollX;

    var relativeItemPosition = xRelativeToTimeline / width;
    var zoom = visibleTimeEnd - visibleTimeStart;
    var timeOffset = relativeItemPosition * zoom;

    var time = Math.round(visibleTimeStart + timeOffset);
    time = Math.floor(time / dragSnap) * dragSnap;

    return time;
  };

  this.scrollAreaClick = function (e) {
    // if not clicking on an item

    if (!(0, _domHelpers.hasSomeParentTheClass)(e.target, 'rct-item')) {
      if (_this4.state.selectedItem) {
        _this4.selectItem(null);
      } else if (_this4.props.onCanvasClick) {
        var _rowAndTimeFromScroll = _this4.rowAndTimeFromScrollAreaEvent(e),
            _rowAndTimeFromScroll2 = _slicedToArray(_rowAndTimeFromScroll, 2),
            row = _rowAndTimeFromScroll2[0],
            time = _rowAndTimeFromScroll2[1];

        if (row >= 0 && row < _this4.props.groups.length) {
          var groupId = (0, _generic._get)(_this4.props.groups[row], _this4.props.keys.groupIdKey);
          _this4.props.onCanvasClick(groupId, time, e);
        }
      }
    }
  };

  this.dragItem = function (item, dragTime, newGroupOrder) {
    var newGroup = _this4.props.groups[newGroupOrder];
    var keys = _this4.props.keys;

    _this4.setState({
      draggingItem: item,
      dragTime: dragTime,
      newGroupOrder: newGroupOrder,
      dragGroupTitle: newGroup ? (0, _generic._get)(newGroup, keys.groupTitleKey) : ''
    });
  };

  this.dropItem = function (item, dragTime, newGroupOrder) {
    _this4.setState({ draggingItem: null, dragTime: null, dragGroupTitle: null });
    if (_this4.props.onItemMove) {
      _this4.props.onItemMove(item, dragTime, newGroupOrder);
    }
  };

  this.resizingItem = function (item, resizeTime, edge) {
    _this4.setState({
      resizingItem: item,
      resizingEdge: edge,
      resizeTime: resizeTime
    });
  };

  this.resizedItem = function (item, resizeTime, edge, timeDelta) {
    _this4.setState({ resizingItem: null, resizingEdge: null, resizeTime: null });
    if (_this4.props.onItemResize && timeDelta !== 0) {
      _this4.props.onItemResize(item, resizeTime, edge);
    }
  };

  this.handleMouseDown = function (e) {
    var topOffset = _this4.state.topOffset;
    var pageY = e.pageY;
    var _props6 = _this4.props,
        headerLabelGroupHeight = _props6.headerLabelGroupHeight,
        headerLabelHeight = _props6.headerLabelHeight;

    var headerHeight = headerLabelGroupHeight + headerLabelHeight;

    if (pageY - topOffset > headerHeight && e.button === 0) {
      _this4.setState({
        isDragging: true,
        dragStartPosition: e.pageX,
        dragLastPosition: e.pageX
      });
    }
  };

  this.handleMouseMove = function (e) {
    if (_this4.state.isDragging && !_this4.state.draggingItem && !_this4.state.resizingItem) {
      _this4.scrollComponent.scrollLeft += _this4.state.dragLastPosition - e.pageX;
      _this4.setState({ dragLastPosition: e.pageX });
    }
  };

  this.handleMouseUp = function (e) {
    var dragStartPosition = _this4.state.dragStartPosition;


    if (Math.abs(dragStartPosition - e.pageX) <= _this4.props.clickTolerance) {
      _this4.scrollAreaClick(e);
    }

    _this4.setState({
      isDragging: false,
      dragStartPosition: null,
      dragLastPosition: null
    });
  };

  this.handleMouseLeave = function () {
    _this4.setState({
      isDragging: false,
      dragStartPosition: null,
      dragLastPosition: null
    });
  };

  this.handleDropFromOutside = function (e) {
    var groupOrder = _this4.state.newGroupOrder;

    _this4.setState({
      isDragging: false,
      dragStartPosition: null,
      dragLastPosition: null,
      draggingItem: null,
      dragTime: null,
      newGroupOrder: null
    });

    _this4.props.addItem(_this4.state.dragTime, groupOrder);

    console.log('drop drop drop');
  };

  this.dragGroupDelta = function (e) {
    var _state8 = _this4.state,
        groupTops = _state8.groupTops,
        topOffset = _state8.topOffset;


    var groupDelta = 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(groupTops)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var item = groupTops[key];
        if (e.pageY - topOffset > item) {
          groupDelta = parseInt(key, 10);
        } else {
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return groupDelta;
  };

  this.handleDragOver = function (e) {
    e.persist();
    e.preventDefault();

    (0, _throttleDebounce.debounce)(500, function () {

      var boundingRect = _this4.scrollComponent.getBoundingClientRect();

      var ratio = (e.pageX - boundingRect.left) / boundingRect.width;
      var _state9 = _this4.state,
          visibleTimeStart = _state9.visibleTimeStart,
          visibleTimeEnd = _state9.visibleTimeEnd,
          width = _state9.width;


      var timeWindow = visibleTimeEnd - visibleTimeStart;
      var currentTime = visibleTimeStart + timeWindow * ratio;

      var groupOrder = _this4.dragGroupDelta(e);

      var group = _this4.props.groups[groupOrder];

      _this4.setState({
        draggingItem: 0,
        dragTime: currentTime,
        newGroupOrder: groupOrder,
        dragGroupTitle: group.title
      });
    })();
  };

  this.handleCanvasMouseEnter = function (e) {
    var showCursorLine = _this4.props.showCursorLine;

    if (showCursorLine) {
      _this4.setState({ mouseOverCanvas: true });
    }

    if (_this4.props.onCanvasMouseEnter) {
      _this4.props.onCanvasMouseEnter(e);
    }
  };

  this.handleCanvasMouseLeave = function (e) {
    var showCursorLine = _this4.props.showCursorLine;

    if (showCursorLine) {
      _this4.setState({ mouseOverCanvas: false });
    }

    if (_this4.props.onCanvasMouseLeave) {
      _this4.props.onCanvasMouseLeave(e);
    }
  };

  this.handleCanvasMouseMove = function (e) {
    var showCursorLine = _this4.props.showCursorLine;
    var _state10 = _this4.state,
        canvasTimeStart = _state10.canvasTimeStart,
        width = _state10.width,
        visibleTimeStart = _state10.visibleTimeStart,
        visibleTimeEnd = _state10.visibleTimeEnd,
        cursorTime = _state10.cursorTime;

    var zoom = visibleTimeEnd - visibleTimeStart;
    var canvasTimeEnd = canvasTimeStart + zoom * 3;
    var canvasWidth = width * 3;
    var pageX = e.pageX;

    var ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
    var boundingRect = _this4.scrollComponent.getBoundingClientRect();
    var timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left);

    if (_this4.props.dragSnap) {
      timePosition = Math.round(timePosition / _this4.props.dragSnap) * _this4.props.dragSnap;
    }

    if (_this4.props.onCanvasMouseMove) {
      _this4.props.onCanvasMouseMove(e);
    }

    if (cursorTime !== timePosition && showCursorLine) {
      _this4.setState({ cursorTime: timePosition, mouseOverCanvas: true });
    }
  };

  this.handleDoubleClick = function (e) {
    var _state11 = _this4.state,
        canvasTimeStart = _state11.canvasTimeStart,
        width = _state11.width,
        visibleTimeStart = _state11.visibleTimeStart,
        visibleTimeEnd = _state11.visibleTimeEnd,
        groupTops = _state11.groupTops,
        topOffset = _state11.topOffset;

    var zoom = visibleTimeEnd - visibleTimeStart;
    var canvasTimeEnd = canvasTimeStart + zoom * 3;
    var canvasWidth = width * 3;
    var pageX = e.pageX,
        pageY = e.pageY;

    var ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
    var boundingRect = _this4.scrollComponent.getBoundingClientRect();
    var timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left);
    if (_this4.props.dragSnap) {
      timePosition = Math.round(timePosition / _this4.props.dragSnap) * _this4.props.dragSnap;
    }

    var groupIndex = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = Object.keys(groupTops)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;

        var item = groupTops[key];
        if (pageY - topOffset > item) {
          groupIndex = parseInt(key, 10);
        } else {
          break;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    if (_this4.props.onCanvasDoubleClick) {
      _this4.props.onCanvasDoubleClick(_this4.props.groups[groupIndex], timePosition, e);
    }
  };

  this.handleCanvasContextMenu = function (e) {
    var _state12 = _this4.state,
        canvasTimeStart = _state12.canvasTimeStart,
        width = _state12.width,
        visibleTimeStart = _state12.visibleTimeStart,
        visibleTimeEnd = _state12.visibleTimeEnd,
        groupTops = _state12.groupTops,
        topOffset = _state12.topOffset;

    var zoom = visibleTimeEnd - visibleTimeStart;
    var canvasTimeEnd = canvasTimeStart + zoom * 3;
    var canvasWidth = width * 3;
    var pageX = e.pageX,
        pageY = e.pageY;

    var ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
    var boundingRect = _this4.scrollComponent.getBoundingClientRect();
    var timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left);
    if (_this4.props.dragSnap) {
      timePosition = Math.round(timePosition / _this4.props.dragSnap) * _this4.props.dragSnap;
    }

    var groupIndex = 0;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = Object.keys(groupTops)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var key = _step3.value;

        var item = groupTops[key];
        if (pageY - topOffset > item) {
          groupIndex = parseInt(key, 10);
        } else {
          break;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    if (_this4.props.onCanvasContextMenu) {
      e.preventDefault();
      _this4.props.onCanvasContextMenu(_this4.props.groups[groupIndex], timePosition, e);
    }
  };
};

exports.default = ReactCalendarTimeline;
