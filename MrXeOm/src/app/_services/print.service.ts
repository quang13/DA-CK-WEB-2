import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
declare var $: any;
@Injectable()
export class PrintService {
    private opt: any;
    constructor(private _dialog: MatDialog) { }
    Print(el: any, options: PrintOption = null) {
        this.opt = options||new PrintOption();
        this.opt.loadCSS.push("./assets/base/print-style.css");
        var $element = this instanceof jQuery ? this : $(el);
        var strFrameName = "printThis-" + (new Date()).getTime();
        if (window.location.hostname !== document.domain && navigator.userAgent.match(/msie/i)) {
            var iframeSrc = "javascript:document.write(\"<head><script>document.domain=\\\"" + document.domain + "\\\";</s" + "cript></head><body></body>\")";
            var printI = document.createElement('iframe');
            printI.name = "printIframe";
            printI.id = strFrameName;
            printI.className = "MSIE";
            document.body.appendChild(printI);
            printI.src = iframeSrc;

        } else {
            var $frame = $("<iframe id='" + strFrameName + "' name='printIframe' />");
            $frame.appendTo("body");
        }

        var $iframe = $("#" + strFrameName);
        if (!this.opt.debug) $iframe.css({
            position: "absolute",
            width: "0px",
            height: "0px",
            left: "-600px",
            top: "-600px"
        });
        setTimeout(() => {
            function setDocType($iframe, doctype) {
                var win, doc;
                win = $iframe.get(0);
                win = win.contentWindow || win.contentDocument || win;
                doc = win.document || win.contentDocument || win;
                doc.open();
                doc.write(doctype);
                doc.close();
            }
            if (this.opt.doctypeString) {
                setDocType($iframe, this.opt.doctypeString);
            }
            var $doc = $iframe.contents(),
                $head = $doc.find("head"),
                $body = $doc.find("body"),
                $base = $('base'),
                baseURL;
            if (this.opt.base === true && $base.length > 0) {
                baseURL = $base.attr('href');
            } else if (typeof this.opt.base === 'string') {
                baseURL = this.opt.base;
            } else {
                baseURL = document.location.protocol + '//' + document.location.host;
            }
            $head.append('<base href="' + baseURL + '">');
            if (this.opt.importCSS) $("link[rel=stylesheet]").each(function () {
                var href = $(this).attr("href");
                if (href) {
                    var media = $(this).attr("media") || "all";
                    $head.append("<link type='text/css' rel='stylesheet' href='" + href + "' media='" + media + "'>");
                }
            });
            if (this.opt.importStyle) $("style").each(function () {
                $head.append(this.outerHTML);
            });
            if (this.opt.pageTitle) $head.append("<title>" + this.opt.pageTitle + "</title>");
            if (this.opt.loadCSS) {
                if ($.isArray(this.opt.loadCSS)) {
                    jQuery.each(this.opt.loadCSS, function (index, value) {
                        $head.append("<link type='text/css' rel='stylesheet' href='" + value + "'>");
                    });
                } else {
                    $head.append("<link type='text/css' rel='stylesheet' href='" + this.opt.loadCSS + "'>");
                }
            }
            var tag = this.opt.copyTagClasses;
            if (tag) {
                tag = tag === true ? 'bh' : tag;
                if (tag.indexOf('b') !== -1) {
                    $body.addClass($('body')[0].className);
                }
                if (tag.indexOf('h') !== -1) {
                    $doc.find('html').addClass($('html')[0].className);
                }
            }
            this.appendContent($body, this.opt.header);
            if (this.opt.canvas) {
                var canvasId = 0;
                $element.find('canvas').addBack('canvas').each(function () {
                    $(this).attr('data-printthis', canvasId++);
                });
            }
            this.appendBody($body, $element, this.opt);
            if (this.opt.canvas) {
                $body.find('canvas').each(function () {
                    var cid = $(this).data('printthis'),
                        $src = $('[data-printthis="' + cid + '"]');
                    this.getContext('2d').drawImage($src[0], 0, 0);
                    $src.removeData('printthis');
                });
            }
            if (this.opt.removeInline) {
                if ($.isFunction($.removeAttr)) {
                    $doc.find("body *").removeAttr("style");
                } else {
                    $doc.find("body *").attr("style", "");
                }
            }
            this.appendContent($body, this.opt.footer);
            setTimeout(() => {
                if ($iframe.hasClass("MSIE")) {
                    window.frames["printIframe"].focus();
                    $head.append("<script>  window.print(); </s" + "cript>");
                } else {
                    if (document.queryCommandSupported("print")) {
                        $iframe[0].contentWindow.document.execCommand("print", false, null);
                    } else {
                        $iframe[0].contentWindow.focus();
                        $iframe[0].contentWindow.print();
                    }
                }
                if (!this.opt.debug) {
                    setTimeout(() => {
                        $iframe.remove();
                    }, 1000);
                }
            }, this.opt.printDelay);
        }, 333);
    }
    appendContent($el, content) {
        if (!content) return;
        $el.append(content.jquery ? content.clone() : content);
    }
    appendBody($body, $element, opt) {
        var $content = $element.clone(opt.formValues);
        if (opt.formValues) {
            this.copyValues($element, $content, 'select, textarea');
        }
        if (opt.removeScripts) {
            $content.find('script').remove();
        }
        if (opt.printContainer) {
            $content.appendTo($body);
        } else {
            $content.each(() => {
                $(this).children().appendTo($body)
            });
        }
    }
    copyValues(origin, clone, elementSelector) {
        var $originalElements = origin.find(elementSelector);
        clone.find(elementSelector).each((index, item) => {
            $(item).val($originalElements.eq(index).val());
        });
    }
}
export interface IPrintOption {
    importCSS: boolean;
    importStyle: boolean;
    printContainer: boolean;
    loadCSS: any[];
    pageTitle: string;
    removeInline: boolean;
    printDelay: number;
    header: any;
    footer: any;
    formValues: boolean;
    canvas: boolean;
    base: boolean;
    doctypeString: string;
    removeScripts: boolean;
    copyTagClasses: boolean;
}
export class PrintOption implements IPrintOption {
    importCSS = false;
    importStyle = false;
    printContainer = true;
    loadCSS = [];
    pageTitle = '';
    removeInline = false;
    printDelay = 333;
    header = null;
    footer = null;
    formValues = true;
    canvas = false;
    base: boolean;
    doctypeString = '<!DOCTYPE html>';
    removeScripts = true;
    copyTagClasses = true;
}