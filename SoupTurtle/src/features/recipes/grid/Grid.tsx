import React from 'react';

import DataGrid, { Column, ColumnChooser, ColumnFixing, FilterRow, GroupPanel, HeaderFilter, Paging, Scrolling, Button, Editing, ColumnChooserSelection, Position } from 'devextreme-react/data-grid';
import { useTranslation } from 'react-i18next';

const serviceUrl = import.meta.env.VITE_BACKEND_URL;

// const remoteDataSource = createStore({
//     key: 'ID',
//     loadUrl: serviceUrl + '/recipes/load',
//     insertUrl: serviceUrl + '/recipes/save',
//     updateUrl: serviceUrl + '/recipes/save',
//     deleteUrl: serviceUrl + '/recipes/remove'
// });

import deMessages from 'devextreme/localization/messages/de.json';
import enMessages from 'devextreme/localization/messages/en.json';
import { locale, loadMessages } from "devextreme/localization";

import * as Common from '../../../shared/components/Common';
import './Grid.scss'

const Grid: React.FC = () => {

    loadMessages(deMessages);
    loadMessages(enMessages);
    locale(Common.i18n.language);
    
    const { t } = useTranslation();

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

    let content = (
        <div id="gridOut" className="dx-viewport borderlessGrid">
            <Common.Icon name='books' size='2x' /> <span className='title'>{t('recipes.title')}</span>
            <div className="protRemarks">
                DevExtreme DataGrid<br />
                Die Daten kommen per REST von <b>{import.meta.env.VITE_BACKEND_URL}</b>
            </div>

            <DataGrid id="dataGrid"
                dataSource={serviceUrl + "/recipes"}
                allowColumnResizing={true}
                allowColumnReordering={true}
                columnResizingMode="widget"
                columnAutoWidth={true}
                wordWrapEnabled={true}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
            >
                <FilterRow visible={true} />
                <ColumnFixing enabled={false} />
                <ColumnChooser enabled={true} mode="select">
                    <Position my="right top" at="right bottom" of=".dx-datagrid-column-chooser-button" />
                    <ColumnChooserSelection allowSelectAll={true} selectByClick={true} recursive={true} />
                </ColumnChooser>
                <GroupPanel visible={true} />
                <HeaderFilter visible={true} />
                <Paging enabled={false} defaultPageSize={100} />
                <Scrolling mode="virtual" rowRenderingMode="virtual" />
                <Editing
                    mode='popup'
                    allowAdding={true}
                    allowUpdating={true}
                    allowDeleting={true}
                    confirmDelete={true}
                    useIcons={false}
                />

                <Column dataField="title" caption={t('recipes.list.title')} allowHiding={false} />
                {/* fixed={true} fixedPosition="left" /> */}
                <Column dataField="ingredients" caption={t('recipes.list.ingredients')} />
                <Column dataField="instructions" caption={t('recipes.list.instructions')} cellRender={CellInstructions} encodeHtml={false} visible={false} />
                <Column dataField="numberServings" caption={t('recipes.list.numberServings')} />
                <Column dataField="quantities" caption={t('recipes.list.quantities')} />
                <Column dataField="category" caption={t('recipes.list.category')} />
                <Column dataField="dateCreated" caption={t('recipes.list.dateCreated')} cellRender={CellCreated} />
                <Column dataField="dateModified" caption={t('recipes.list.dateModified')} cellRender={CellModified} />
                <Column dataField="source" caption={t('recipes.list.source')} cellRender={CellSource} />
                <Column dataField="notes" caption={t('recipes.list.notes')} visible={false} />
                <Column dataField="description" caption={t('recipes.list.description')} />
                <Column dataField="price" caption={t('recipes.list.price')} />
                <Column type="buttons" width={110}>
                    <Button name="edit" cssClass="click-pri"><Common.Icon name='pen-to-square' size='lg' /></Button>
                    <Button name="delete" cssClass="click-pri"><Common.Icon name='trash-can' size='lg' /></Button>
                </Column>
                {/* <RemoteOperations groupPaging={true} /> */}
            </DataGrid>
        </div>
    );

    return content
};

export default Grid;
