import React from 'react';
//import { Link } from 'react-router-dom';

import DataGrid, { Column, ColumnChooser, ColumnFixing, FilterRow, GroupPanel, HeaderFilter, Paging, Scrolling, Button, Editing, ColumnChooserSelection, Position, Popup, FormItem } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import ODataStore from 'devextreme/data/odata/store';
import 'devextreme-react/text-area';
import deMessages from 'devextreme/localization/messages/de.json';
import enMessages from 'devextreme/localization/messages/en.json';
import { locale, loadMessages } from "devextreme/localization";

import { useTranslation } from 'react-i18next';
import { loadRecipe, loadRecipes, saveRecipe, removeRecipe } from '../../../api/recipe.api';
import * as Common from '../../../shared/components/Common';
import './Grid.scss'

type Props = {
    dSource: 'REST' | 'ODATA' | 'GRAPHQL';
};

const Grid: React.FC<Props> = ({ dSource }) => {

    // #region local functions

    function onRowUpdating(e: any) {
        if (IsOdata()) return;
        // Needed to pass all data for a update, otherwise only changed data is included in POST/PUT
        e.newData = { ...e.oldData, ...e.newData };
    }

    function GetDataSource() {
        switch (dSource) {
            case 'REST':
                return restStore;
            case 'ODATA':
                return odataStore;
        }
    }

    function IsOdata() {
        return (dSource === 'ODATA');
    }

    // REST Store
    const restStore = new CustomStore({
        key: 'id',
        byKey: (key) => {
            return loadRecipe(key);
        },
        load: () => {
            return loadRecipes();
        },
        insert: (values) => {
            return saveRecipe(values);
        },
        update: (_key, values) => {
            return saveRecipe(values);
        },
        remove: (key) => {
            return removeRecipe(key);
        }
    });

    // ODATA Store
    const odataStore = new ODataStore({
        url: import.meta.env.VITE_BACKEND_URL + '/odata/recipes',
        version: 4,
        key: 'id',
        keyType: 'Int32',
    });

    const { t } = useTranslation();

    // DevExtreme
    loadMessages(deMessages);
    loadMessages(enMessages);
    locale(Common.i18n.language);

    function CellInstructions(cellData: any) {
        return Common.ToHtml(cellData.row.data.instructions);
    }
    function CellCreated(cellData: any) {
        return Common.DateFormatString(cellData.row.data.dateCreated);
    }
    function CellModified(cellData: any) {
        return Common.DateFormatString(cellData.row.data.dateModified);
    }
    function CellSource(cellData: any) {
        return cellData.row.data.source + (cellData.row.data.sourcePage !== "" ? " / " + cellData.row.data.sourcePage : "");
    }
    // function CellTitle(cellData: any) {
    //     return (<Link to={`edit/${cellData.row.data.id}`} ><b>{cellData.row.data.title}</b></Link>)
    // }

    // #endregion

    let content = (
        <div id="gridOut" className="dx-viewport borderlessGrid">
            <Common.Icon name='books' size='2x' /> <span className='title'>{t('recipes.title_plural')}</span>
            <div className="protRemarks">
                DevExtreme DataGrid<br />
                Die Daten kommen per <b>{dSource}</b> von <b>{import.meta.env.VITE_BACKEND_URL}</b>
            </div>

            <DataGrid id="dataGrid"
                // dataSource={serviceUrl + "/recipes"}
                dataSource={GetDataSource()}
                allowColumnResizing={true}
                allowColumnReordering={true}
                columnResizingMode="widget"
                columnAutoWidth={true}
                wordWrapEnabled={true}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
                remoteOperations={false}
                onRowUpdating={onRowUpdating}
            >
                {/* <RemoteOperations groupPaging={true} /> */}
                <FilterRow visible={true} />
                <ColumnFixing enabled={false} />
                <ColumnChooser enabled={true} mode="select">
                    <Position my="right top" at="right bottom" of=".dx-datagrid-column-chooser-button" />
                    <ColumnChooserSelection allowSelectAll={true} selectByClick={true} recursive={true} />
                </ColumnChooser>
                <GroupPanel visible={true} />
                <HeaderFilter visible={true} />
                <Paging enabled={false} />
                <Scrolling mode="virtual" rowRenderingMode="virtual" />
                <Editing mode='popup' allowAdding={!IsOdata()} allowUpdating={!IsOdata()} allowDeleting={!IsOdata()} confirmDelete={true} useIcons={false} >
                    <Popup title={t('recipes.title_singular')} showTitle={true} width={900} height={800} />
                </Editing>

                <Column dataField="title" caption={t('recipes.list.title')} allowHiding={false}>
                    <FormItem colSpan={2} />
                </Column>
                {/* fixed={true} fixedPosition="left" /> */}
                <Column dataField="description" caption={t('recipes.list.description')}>
                    <FormItem colSpan={2} />
                </Column>
                <Column dataField="ingredients" caption={t('recipes.list.ingredients')}>
                    <FormItem colSpan={2} editorType="dxTextArea" editorOptions={{ height: 50 }} />
                </Column>
                <Column dataField="instructions" caption={t('recipes.list.instructions')} cellRender={CellInstructions} encodeHtml={false} visible={false}>
                    <FormItem colSpan={2} editorType="dxTextArea" editorOptions={{ height: 50 }} />
                </Column>

                <Column dataField="numberServings" caption={t('recipes.list.numberServings')} />
                <Column dataField="quantities" caption={t('recipes.list.quantities')} />
                <Column dataField="dateCreated" caption={t('recipes.list.dateCreated')} cellRender={CellCreated} dataType="date" editorOptions={{ dataType: "date" }} />
                <Column dataField="dateModified" caption={t('recipes.list.dateModified')} cellRender={CellModified} dataType="date" editorOptions={{ dataType: "date" }} />
                <Column dataField="category" caption={t('recipes.list.category')}>
                    <FormItem editorType="dxTextArea" editorOptions={{ height: 200 }} />
                </Column>
                <Column dataField="notes" caption={t('recipes.list.notes')} visible={false}>
                    <FormItem editorType="dxTextArea" editorOptions={{ height: 200 }} />
                </Column>
                <Column dataField="source" caption={t('recipes.list.source')} cellRender={CellSource} />
                <Column dataField="sourcePage" caption={t('recipes.list.source_page')} />
                <Column dataField="price" caption={t('recipes.list.price')} format="#0.00 €" dataType="number">
                    <FormItem editorOptions={{format: {type:'currency',currency:'EUR', precision: 2}}} />
                </Column>
                <Column type="buttons" width={110} visible={!IsOdata()}>
                    <Button name="edit" cssClass="click-pri"><Common.Icon name='pen-to-square' size='lg' /></Button>
                    <Button name="delete" cssClass="click-pri"><Common.Icon name='trash-can' size='lg' /></Button>
                </Column>
            </DataGrid>
        </div >
    );

    return content
};

export default Grid;

